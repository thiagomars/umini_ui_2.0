'use client'

import { Play, Pause, SkipBack, SkipForward, Loader2, Maximize, Minimize } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    sources: { src: string; type: string }[];
    label?: string;
    className?: string;
}

export default function VideoPlayer({ sources, label = "Assistir vídeo", className }: VideoPlayerProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handlePlay = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
            setHasStarted(true);
        }
    }, []);

    const handlePause = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const togglePlayPause = useCallback(() => {
        if (isPlaying) handlePause();
        else handlePlay();
    }, [isPlaying, handlePlay, handlePause]);

    const skip = useCallback((seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
        }
    }, [duration]);

    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && videoRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            videoRef.current.currentTime = ratio * duration;
        }
    }, [duration]);

    const toggleFullscreen = useCallback(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        // Standard API
        if (container.requestFullscreen) {
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => console.error(err));
            } else {
                document.exitFullscreen();
            }
        }
        // iOS/Webkit Fallback for iPhone (usually requires calling on the video element directly)
        else if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
        }
        // Other Webkit browsers
        else if ((container as any).webkitRequestFullscreen) {
            if (!(document as any).webkitFullscreenElement) {
                (container as any).webkitRequestFullscreen();
            } else {
                (document as any).webkitExitFullscreen();
            }
        }
    }, []);

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onTimeUpdate = () => setCurrentTime(video.currentTime);
        const onLoadedMetadata = () => setDuration(video.duration);
        const onEnded = () => { setIsPlaying(false); };
        const onWaiting = () => setIsLoading(true);
        const onPlaying = () => setIsLoading(false);
        const onCanPlay = () => setIsLoading(false);
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('ended', onEnded);
        video.addEventListener('waiting', onWaiting);
        video.addEventListener('playing', onPlaying);
        video.addEventListener('canplay', onCanPlay);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);

        return () => {
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('ended', onEnded);
            video.removeEventListener('waiting', onWaiting);
            video.removeEventListener('playing', onPlaying);
            video.removeEventListener('canplay', onCanPlay);
            document.removeEventListener('fullscreenchange', onFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
        };
    }, []);

    const resetHideTimeout = useCallback(() => {
        setShowControls(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        if (isPlaying) {
            hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) setShowControls(true);
        else resetHideTimeout();
    }, [isPlaying, resetHideTimeout]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={containerRef}
            className={cn("relative aspect-video rounded-3xl overflow-hidden shadow-2xl group/player", className)}
            onMouseMove={hasStarted ? resetHideTimeout : undefined}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                poster="/thumb.png"
            >
                {sources.map((s) => (
                    <source key={s.src} src={s.src} type={s.type} />
                ))}
            </video>

            {/* Spinner de loading/buffering */}
            {isLoading && hasStarted && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30">
                    <Loader2 size={48} className="text-white animate-spin" />
                </div>
            )}

            {/* Overlay inicial — botão de play grande */}
            {!hasStarted && (
                <button
                    onClick={handlePlay}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 hover:bg-black/40 transition-colors cursor-pointer group"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
                        <Play size={36} className="text-white ml-1.5" fill="white" />
                    </div>
                    <span className="mt-8 text-white/80 font-medium animate-pulse text-sm tracking-widest uppercase">
                        {label}
                    </span>
                </button>
            )}

            {/* Controles de vídeo */}
            {hasStarted && (
                <div
                    className={`absolute inset-0 z-10 flex flex-col justify-end transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Área clicável para toggle play/pause */}
                    <button
                        onClick={togglePlayPause}
                        className="absolute inset-0 cursor-pointer"
                    />

                    {/* Barra de controles */}
                    <div className="relative z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-4 px-4 md:px-6">

                        {/* Barra de progresso */}
                        <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group hover:h-2.5 transition-all"
                        >
                            <div
                                className="h-full bg-primary rounded-full relative transition-all"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Botões e tempo */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); skip(-10); }}
                                    className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
                                    title="Voltar 10s"
                                >
                                    <SkipBack size={18} />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                                    className="text-white hover:text-primary transition-colors cursor-pointer p-1"
                                >
                                    {isPlaying
                                        ? <Pause size={22} fill="white" />
                                        : <Play size={22} fill="white" className="ml-0.5" />
                                    }
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); skip(10); }}
                                    className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
                                    title="Avançar 10s"
                                >
                                    <SkipForward size={18} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-white/60 text-xs md:text-sm font-mono tabular-nums">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                    className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
                                    title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                                >
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
