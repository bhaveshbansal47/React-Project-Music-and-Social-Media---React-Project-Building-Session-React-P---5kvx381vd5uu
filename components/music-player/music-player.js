"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function MusicPlayer({ currentMusic }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const currentTimeInterval = useRef();
    const audioRef = useRef();
    const getTimeInString = (time) => {
        const minutes = String(parseInt(time / 60));
        const seconds = String(time % 60);
        return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    };
    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            clearInterval(currentTimeInterval.current);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
            currentTimeInterval.current = setInterval(() => {
                updateCurrentTime();
            }, 1000);
        }
    };
    const updateCurrentTime = () => {
        setCurrentTime((prev) => {
            if (prev === totalTime) {
                setIsPlaying(false);
                clearInterval(currentTimeInterval.current);
                setCurrentTime(0)
            }
            return Math.ceil(audioRef.current.currentTime);
        });
    };
    const updateTotalTime = () => {
        const interval = setInterval(() => {
            const duration = audioRef.current.duration;
            if (duration) {
                setTotalTime(Math.ceil(duration));
                clearInterval(interval);
            }
        }, 200);
    };
    useEffect(() => {
        if (currentMusic) {
            setIsPlaying(false);
            updateTotalTime();
            setCurrentTime(0);
        }
        return () => {
            clearInterval(currentTimeInterval.current);
        };
    }, [currentMusic]);
    if (!currentMusic) return null;
    return (
        <div style={styles.container}>
            <img style={styles.thumbnail} src={currentMusic.thumbnail} />
            <div style={styles.titleContainer}>
                <h2 style={styles.title}>{currentMusic.title}</h2>
                <h5>{currentMusic.artist.map((artist) => artist.name).join(" & ")}</h5>
            </div>
            <button onClick={playPause} style={styles.playPauseButton}>
                {isPlaying ? "⏸️" : "▶️"}
            </button>
            <div style={styles.timeContainer}>
                <h3>{getTimeInString(currentTime)}</h3>
                <h3>{getTimeInString(totalTime)}</h3>
            </div>
            <audio ref={audioRef} src={currentMusic.audio_url} />
        </div>
    );
}

const styles = {
    container: {
        height: 120,
        border: "3px solid black",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "orange",
        display: "flex",
        alignItems: "center",
    },
    thumbnail: {
        width: 100,
        height: 100,
        marginLeft: 40,
    },
    title: {
        color: "white",
        marginBottom: 10,
    },
    titleContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        textAlign: "center",
    },
    playPauseButton: {
        border: "none",
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: "50%",
        fontSize: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    timeContainer: {
        display: "flex",
        color: "white",
        padding: 20,
        gap: 10,
    },
};
