"use client";

import { SummaryReel } from "@/types";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { useState } from "react";

interface SummaryReelProps {
    summaryReel: SummaryReel;
    onClose?: () => void;
}

type SlideType =
    | { type: "title"; content: string; subtitle: string; emoji: string }
    | { type: "point"; content: string; number: number }
    | { type: "cta"; content: string; hashtags: string[] };

export function SummaryReelComponent({ summaryReel, onClose }: SummaryReelProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const slides: SlideType[] = [
        {
            type: "title",
            content: summaryReel.title,
            subtitle: summaryReel.subtitle,
            emoji: summaryReel.emoji,
        },
        ...summaryReel.keyPoints.map((point, index) => ({
            type: "point" as const,
            content: point,
            number: index + 1,
        })),
        {
            type: "cta",
            content: summaryReel.callToAction,
            hashtags: summaryReel.hashtags,
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="fixed bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-sm mx-auto">
                {/* Close button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
                    >
                        ✕
                    </button>
                )}

                {/* Instagram-style card */}
                <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-[2px] rounded-2xl shadow-2xl">
                    <div className="bg-black rounded-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-800">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">AI</span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">SummarizeAI</p>
                                    <p className="text-gray-400 text-xs">Powered by Gemini</p>
                                </div>
                            </div>
                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Content Area */}
                        <div className="relative h-96 overflow-hidden">
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? "translate-x-0" :
                                        index < currentSlide ? "-translate-x-full" : "translate-x-full"
                                        }`}
                                >
                                    {slide.type === "title" && (
                                        <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                            <div className="text-6xl mb-4 animate-bounce">{slide.emoji}</div>
                                            <h1 className="text-2xl font-bold text-center mb-2">{slide.content}</h1>
                                            <p className="text-center text-blue-100 opacity-90">{slide.subtitle}</p>
                                        </div>
                                    )}

                                    {slide.type === "point" && (
                                        <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                                            <div className="flex items-center mb-4">
                                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-sm font-bold">{slide.number}</span>
                                                </div>
                                                <div className="h-[2px] flex-1 bg-white/20 rounded"></div>
                                            </div>
                                            <p className="text-lg leading-relaxed">{slide.content}</p>
                                        </div>
                                    )}

                                    {slide.type === "cta" && (
                                        <div className="h-full flex flex-col justify-center p-6 bg-gradient-to-br from-pink-600 to-red-600 text-white">
                                            <div className="text-center">
                                                <div className="text-4xl mb-4">🎯</div>
                                                <p className="text-lg font-semibold mb-6">{slide.content}</p>
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {slide.hashtags.map((hashtag: string, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-white/20 rounded-full text-sm"
                                                        >
                                                            {hashtag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Navigation arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                                ←
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                                →
                            </button>

                            {/* Progress dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Instagram-style actions */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setLiked(!liked)}
                                        className={`transition-colors ${liked ? "text-red-500" : "text-white"}`}
                                    >
                                        <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
                                    </button>
                                    <button className="text-white">
                                        <MessageCircle className="w-6 h-6" />
                                    </button>
                                    <button className="text-white">
                                        <Send className="w-6 h-6" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSaved(!saved)}
                                    className={`transition-colors ${saved ? "text-yellow-500" : "text-white"}`}
                                >
                                    <Bookmark className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
                                </button>
                            </div>

                            <div className="text-white text-sm">
                                <p className="font-semibold">AI-generated summary</p>
                                <p className="text-gray-400 text-xs mt-1">
                                    Slide {currentSlide + 1} of {slides.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 