import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { RegisterPageSkeleton } from "./Loader";
import { readTokenFromLocalStorage } from "../Utils/auth";
import discount3 from "../assets/discount2.png";
import { getRandomOffer } from "../Utils/offers";

const DEFAULT_IMG = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80";
const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1480&q=80",
    "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80",
];

export default function ProductDetail({ product: productProp }) {
    const { id: paramId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const initial = productProp || location.state?.product || null;
    const [product, setProduct] = useState(initial);
    const [loading, setLoading] = useState(!initial);
    const [error, setError] = useState(null);
    const [imageSrc, setImageSrc] = useState(
        initial ? initial.image || initial.logo || FALLBACK_IMAGES[Number(initial.id?.toString()?.split?.("-")?.pop ?? 0) % FALLBACK_IMAGES.length] || DEFAULT_IMG : null
    );

    // single offer for this page load
    const [singleOffer, setSingleOffer] = useState("");
    useEffect(() => {
        setSingleOffer(getRandomOffer());
    }, []);

    useEffect(() => {
        if (product) return;
        let mounted = true;
        async function fetchById(id) {
            setLoading(true);
            setError(null);
            try {
                const token = readTokenFromLocalStorage();
                if (!token) throw new Error("No auth token");

                try {
                    const res = await axios.get(`https://staging.fastor.ai/v1/m/restaurant/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: 10000,
                    });
                    const data = res?.data?.data ?? res?.data ?? null;
                    if (data && mounted) {
                        setProduct(data);
                        setImageSrc(data.logo || data.image || FALLBACK_IMAGES[Number(id) % FALLBACK_IMAGES.length] || DEFAULT_IMG);
                        return;
                    }
                } catch (err) {
                    // ignore and fallback to list fetch
                    console.warn("Direct fetch failed, falling back to list fetch", err?.message ?? err);
                }

                const listRes = await axios.get("https://staging.fastor.ai/v1/m/restaurant", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { city_id: 118 },
                    timeout: 10000,
                });
                const items = listRes?.data?.data?.results ?? [];
                const found = items.find((it) => String(it.restaurant_id) === String(id) || String(it.id) === String(id));
                if (!found) throw new Error("Item not found");
                if (mounted) {
                    setProduct(found);
                    setImageSrc(found.logo || found.image || FALLBACK_IMAGES[Number(found.restaurant_id ?? id) % FALLBACK_IMAGES.length] || DEFAULT_IMG);
                }
            } catch (err) {
                console.error("ProductDetail fetch error:", err);
                if (mounted) setError("Could not load product details");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        if (paramId) fetchById(paramId);
        else setLoading(false);

        return () => {
            mounted = false;
        };
    }, [paramId, product]);

    const handleImgError = (e) => {
        const el = e.currentTarget;
        const attempts = Number(el.dataset.errAttempts || 0);
        if (attempts >= 3) {
            el.onerror = null;
            el.src = DEFAULT_IMG;
            el.dataset.errAttempts = attempts + 1;
            return;
        }
        el.dataset.errAttempts = attempts + 1;
        const idx = Number(product?.id?.toString()?.split?.("-")?.pop?.() ?? attempts);
        el.src = FALLBACK_IMAGES[(idx + attempts) % FALLBACK_IMAGES.length] || DEFAULT_IMG;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-[375px] h-[812px] bg-white shadow-2xl overflow-auto border border-gray-200 flex flex-col">
                    <RegisterPageSkeleton />
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-[375px] h-[812px] bg-white shadow-2xl overflow-auto border border-gray-200 flex flex-col p-4">
                    <button onClick={() => navigate(-1)} className="text-sm text-indigo-600 mb-4">&larr; Back</button>
                    <p className="text-red-500">{error ?? "Product not available"}</p>
                </div>
            </div>
        );
    }

    const p = product;
    const title = p.restaurant_name ?? p.name ?? "Unnamed";
    const address = p.address_complete && p.address_complete !== "null" ? p.address_complete : (p.address || "Address not available");
    const short = p.short_description ?? p.description ?? p.about ?? "";
    const rating = p.rating ?? p.avg_rating ?? 4.5;
    const img = imageSrc || p.image || p.logo || FALLBACK_IMAGES[Number(p.restaurant_id ?? p.id ?? 0) % FALLBACK_IMAGES.length] || DEFAULT_IMG;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-[375px] h-[812px] bg-white shadow-2xl overflow-auto border border-gray-200 flex flex-col">
                <div className="relative w-full h-[46vh] ">
                    <img src={img} alt={title} onError={handleImgError} className="w-full h-full object-cover" />
                    <button onClick={() => navigate(-1)} className="absolute left-3 top-6 bg-white/70 p-2 rounded-full shadow" aria-label="Back">
                        ‹
                    </button>
                </div>

                <div className="bg-white rounded-t-3xl -mt-8 p-5 shadow-lg flex-1 rounded-2xl relative">
                    <div className="flex justify-between items-start ">
                        <div className="flex-1 pr-3">
                            <h2 className="text font-bold">{title}</h2>
                            <p className="text-[14px] text-gray-500 ">{address}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg ">
                                <i className="fa-regular fa-star text-gray-500"></i>
                            </div>
                            <div className="text-sm text-gray-500 ">{rating}</div>
                        </div>
                    </div>

                    {/* Offers row  */}
                    <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
                        <img src={discount3} alt="offer" className="h-4 w-4" />
                        <span className="text-[12px] text-amber-600">
                            {p.offers_text ? p.offers_text : p.offers_count ? `${p.offers_count} Offers` : singleOffer || "Offers available"}
                        </span>
                    </div>

                    <p className="mt-8 text-gray-600 leading-relaxed flex-1 text-sm">{short || "Our delicious items are prepared fresh. Tap Add to Cart to order."}</p>

                    <div className="mt-18  flex gap-3 sticky bottom-0 bg-white pt-4">
                        <button onClick={() => navigate("/underConstructionScreen")} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold shadow">
                            Add to cart
                        </button>
                        <button onClick={() => window.open(`tel:${p.contact_number ?? p.phone ?? ""}`)} className="w-14 h-14 rounded-xl border flex items-center justify-center" aria-label="call restaurant">
                            📞
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
