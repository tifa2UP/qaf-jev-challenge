"""Original restrained film textures. Requires Python 3 and NumPy; no sampled audio.

The 24-second room texture is periodic and can loop without a hard seam. All files
are intentionally quiet; mix them under speech rather than normalizing each to 0 dB.
"""
from pathlib import Path
import wave
import numpy as np

RATE = 48000
OUT = Path(__file__).resolve().parents[1] / "public" / "audio"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(20261006)


def write(name, samples, peak):
    samples = np.asarray(samples, dtype=np.float64)
    samples *= peak / max(float(np.max(np.abs(samples))), 1e-10)
    with wave.open(str(OUT / name), "wb") as wav:
        wav.setnchannels(1 if samples.ndim == 1 else samples.shape[1])
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes((samples * 32767).astype("<i2").tobytes())


def texture(seconds, low, high):
    count = int(RATE * seconds)
    freq = np.fft.rfftfreq(count, 1 / RATE)
    shape = (1 - np.exp(-(freq / low) ** 4)) * np.exp(-(freq / high) ** 4)
    shape /= np.sqrt(np.maximum(freq, low))
    spectrum = rng.normal(size=len(freq)) + 1j * rng.normal(size=len(freq))
    result = np.fft.irfft(spectrum * shape, n=count)
    return result / max(np.std(result), 1e-10)


duration = 24
t = np.arange(RATE * duration) / RATE
# Very slow, quiet air; independent channels add width without dramatic movement.
room = np.column_stack([texture(duration, 90, 1550), texture(duration, 90, 1550)])
breath = 0.88 + 0.12 * np.sin(2 * np.pi * t / duration)
room *= breath[:, None]
warmth = (np.sin(2 * np.pi * 110 * t) + 0.28 * np.sin(2 * np.pi * 165 * t)) * 0.06
room += warmth[:, None]
write("sfx-room.wav", room, 0.036)

duration = 0.48
t = np.arange(int(RATE * duration)) / RATE
envelope = (1 - np.exp(-t / 0.002)) * np.exp(-t / 0.055)
tap = (np.sin(2 * np.pi * 620 * t) + 0.3 * np.sin(2 * np.pi * 1020 * t)) * envelope
tap += texture(duration, 450, 2400) * envelope * 0.14
tap *= np.minimum((duration - t) / 0.035, 1)
write("sfx-citation.wav", tap, 0.105)

duration = 0.82
t = np.arange(int(RATE * duration)) / RATE
envelope = np.sin(np.pi * t / duration) ** 2.5
paper = texture(duration, 400, 4100) * envelope
paper *= 0.65 + 0.18 * np.sin(2 * np.pi * 17 * t) + 0.17 * np.sin(2 * np.pi * 31 * t)
pan = np.linspace(0.8, 0.25, len(t))
write("sfx-page.wav", np.column_stack([paper * pan, paper * (1 - pan)]), 0.064)

duration = 2.8
t = np.arange(int(RATE * duration)) / RATE
logo = np.zeros_like(t)
# An understated warm resolve, entirely synthesized; no sampled performance.
for hz, offset, gain in [(220, 0, 0.65), (330, 0.16, 0.32), (440, 0.3, 0.2)]:
    local = np.maximum(t - offset, 0)
    envelope = (1 - np.exp(-local / 0.12)) * np.exp(-local / 0.63) * (t >= offset)
    logo += gain * np.sin(2 * np.pi * hz * local) * envelope
logo *= np.clip((duration - t) / 0.7, 0, 1)
write("sfx-resolve.wav", np.column_stack([logo, logo * 0.94]), 0.06)
print("Wrote 4 original sound textures to", OUT)
