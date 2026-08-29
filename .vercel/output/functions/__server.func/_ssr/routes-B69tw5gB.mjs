import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as FolderOpen, D as ChevronLeft, E as ChevronRight, O as Check, S as GripVertical, T as Copy, _ as ListPlus, a as Trash2, b as House, c as Shuffle, d as Repeat, f as Repeat1, g as ListStart, h as List, l as Settings2, m as Pause, n as VolumeX, o as SkipForward, p as Play, r as Volume2, s as SkipBack, t as X, u as Search, v as ListMusic, w as Ellipsis, x as Heart, y as LayoutGrid } from "../_libs/lucide-react.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Label2, c as Separator2, d as Trigger, i as ItemIndicator2, l as SubContent2, n as Content2, o as Portal2, r as Item2, s as Root2, t as CheckboxItem2, u as SubTrigger2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { a as Trigger$1, i as Root3, n as Portal, r as Provider, t as Content2$1 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { i as verticalListSortingStrategy, n as sortableKeyboardCoordinates, r as useSortable, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B69tw5gB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PALETTES = [
	[
		"#E85D2C",
		"#1a1410",
		"#F4EFE8"
	],
	[
		"#c44b24",
		"#0c0b0a",
		"#d9cfc4"
	],
	[
		"#8a3a22",
		"#161412",
		"#e8dcd0"
	],
	[
		"#f07a4a",
		"#12100e",
		"#c4b8ac"
	],
	[
		"#d4552a",
		"#1e1b18",
		"#f4efe8"
	]
];
function hashStr(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function escapeXml(s) {
	const map = {
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"'": "&apos;",
		"\"": "&quot;"
	};
	return s.replace(/[<>&'"]/g, (ch) => map[ch] ?? ch);
}
function placeholderCover(seed, title, artist) {
	const h = hashStr(seed);
	const [a, b, c] = PALETTES[h % PALETTES.length];
	const variant = h % 4;
	const t = escapeXml(title.slice(0, 22));
	let art = "";
	if (variant === 0) art = `<circle cx="80" cy="90" r="48" fill="${a}"/><circle cx="80" cy="90" r="28" fill="${b}"/>`;
	else if (variant === 1) art = `<rect x="24" y="28" width="112" height="18" fill="${a}"/><rect x="24" y="56" width="80" height="18" fill="${c}" opacity=".5"/><rect x="24" y="84" width="96" height="18" fill="${a}" opacity=".7"/>`;
	else if (variant === 2) art = `<polygon points="80,24 132,148 28,148" fill="${a}"/><circle cx="80" cy="100" r="14" fill="${c}"/>`;
	else art = `<rect x="30" y="30" width="100" height="100" fill="none" stroke="${a}" stroke-width="6"/><rect x="50" y="50" width="60" height="60" fill="${a}"/>`;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
    <rect width="160" height="160" fill="${b}"/>
    ${art}
    <rect x="0" y="0" width="160" height="6" fill="${a}"/>
    <text x="12" y="148" fill="${c}" font-size="9" font-family="ui-sans-serif,system-ui" opacity=".8">${t}</text>
  </svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function hashPeaks(seed, n = 180) {
	let x = hashStr(seed) || 1;
	const out = [];
	for (let i = 0; i < n; i++) {
		x = Math.imul(x ^ x >>> 13, 1540483477);
		const env = .35 + .65 * Math.sin(i / n * Math.PI);
		out.push(.12 + (x >>> 0) / 4294967295 * .88 * env);
	}
	return out;
}
var DB_NAME = "ember-player";
var DB_VERSION = 1;
var STORE = "tracks";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
function reqToPromise(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function idbPut(track) {
	const db = await openDb();
	try {
		await reqToPromise(db.transaction(STORE, "readwrite").objectStore(STORE).put(track));
	} finally {
		db.close();
	}
}
async function idbDelete(id) {
	const db = await openDb();
	try {
		await reqToPromise(db.transaction(STORE, "readwrite").objectStore(STORE).delete(id));
	} finally {
		db.close();
	}
}
async function idbClear() {
	const db = await openDb();
	try {
		await reqToPromise(db.transaction(STORE, "readwrite").objectStore(STORE).clear());
	} finally {
		db.close();
	}
}
async function idbGetAll() {
	const db = await openDb();
	try {
		return await reqToPromise(db.transaction(STORE, "readonly").objectStore(STORE).getAll());
	} finally {
		db.close();
	}
}
function storedToTrack(row, urls) {
	return {
		id: row.id,
		title: row.title,
		artist: row.artist,
		album: row.album,
		year: row.year,
		duration: row.duration,
		filename: row.filename,
		url: urls.audio,
		coverUrl: urls.cover,
		peaks: row.peaks,
		source: "import"
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTime(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const s = Math.floor(seconds);
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const sec = s % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
	return `${m}:${String(sec).padStart(2, "0")}`;
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `q_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}
function parseFilename(name) {
	const cleaned = name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").trim().replace(/^\d{1,3}[.\-)\s]+/, "").trim();
	const parts = cleaned.split(/\s+[-–—]\s+/);
	if (parts.length >= 2) return {
		artist: parts[0].trim(),
		title: parts.slice(1).join(" - ").trim()
	};
	return {
		title: cleaned || name,
		artist: "Unknown Artist"
	};
}
function isAudioFile(name) {
	return /\.(mp3|wav|flac|ogg|m4a|aac|opus|webm)$/i.test(name);
}
async function computePeaksAndDuration(file) {
	try {
		const ctx = new AudioContext();
		const buf = await ctx.decodeAudioData(await file.arrayBuffer());
		const channel = buf.getChannelData(0);
		const buckets = 180;
		const size = Math.max(1, Math.floor(channel.length / buckets));
		const peaks = [];
		let max = 1e-6;
		for (let b = 0; b < buckets; b++) {
			let m = 0;
			const start = b * size;
			for (let i = 0; i < size; i++) m = Math.max(m, Math.abs(channel[start + i] || 0));
			peaks.push(m);
			max = Math.max(max, m);
		}
		await ctx.close();
		return {
			peaks: peaks.map((v) => Number((v / max).toFixed(4))),
			duration: buf.duration
		};
	} catch {
		return null;
	}
}
async function readTags(file) {
	try {
		const { parseBlob } = await import("../_libs/music-metadata+[...].mjs").then((n) => n.t);
		const meta = await parseBlob(file);
		const pic = meta.common.picture?.[0];
		let coverBlob;
		if (pic?.data) {
			const bytes = pic.data instanceof Uint8Array ? pic.data : new Uint8Array(pic.data);
			const copy = new Uint8Array(bytes.byteLength);
			copy.set(bytes);
			coverBlob = new Blob([copy], { type: pic.format || "image/jpeg" });
		}
		return {
			title: meta.common.title,
			artist: meta.common.artist || meta.common.albumartist,
			album: meta.common.album,
			year: meta.common.year,
			duration: meta.format.duration,
			coverBlob
		};
	} catch {
		return null;
	}
}
async function importAudioFiles(files) {
	const tracks = [];
	const errors = [];
	for (const file of files) {
		if (!isAudioFile(file.name) && !file.type.startsWith("audio/")) {
			errors.push({
				name: file.name,
				message: "Unsupported format"
			});
			continue;
		}
		try {
			const parsed = parseFilename(file.name);
			const tags = await readTags(file);
			const decoded = await computePeaksAndDuration(file);
			if (!decoded && !tags) {
				errors.push({
					name: file.name,
					message: "File is unreadable or corrupted"
				});
				continue;
			}
			const id = `import:${uid()}`;
			const title = tags?.title?.trim() || parsed.title;
			const artist = tags?.artist?.trim() || parsed.artist;
			const album = tags?.album?.trim() || "Unknown Album";
			const duration = decoded?.duration || tags?.duration || 0;
			const peaks = decoded?.peaks || hashPeaks(id);
			await idbPut({
				id,
				title,
				artist,
				album,
				year: tags?.year,
				duration,
				filename: file.name,
				peaks,
				audioBlob: file,
				coverBlob: tags?.coverBlob
			});
			const audioUrl = URL.createObjectURL(file);
			const coverUrl = tags?.coverBlob ? URL.createObjectURL(tags.coverBlob) : placeholderCover(id, title, artist);
			tracks.push({
				id,
				title,
				artist,
				album,
				year: tags?.year,
				duration,
				filename: file.name,
				url: audioUrl,
				coverUrl,
				peaks,
				source: "import"
			});
		} catch {
			errors.push({
				name: file.name,
				message: "Could not import this file"
			});
		}
	}
	return {
		tracks,
		errors
	};
}
async function filesFromDataTransfer(dt) {
	const items = [...dt.items];
	const files = [];
	const walk = async (entry) => {
		if (!entry) return;
		if (entry.isFile) {
			const file = await new Promise((resolve) => {
				entry.file(resolve, () => resolve(null));
			});
			if (file && (isAudioFile(file.name) || file.type.startsWith("audio/"))) files.push(file);
		} else if (entry.isDirectory) {
			const reader = entry.createReader();
			const readAll = async () => {
				const batch = await new Promise((resolve) => {
					reader.readEntries(resolve, () => resolve([]));
				});
				if (batch.length === 0) return [];
				return [...batch, ...await readAll()];
			};
			for (const child of await readAll()) await walk(child);
		}
	};
	if (items.some((it) => typeof it.webkitGetAsEntry === "function" && it.webkitGetAsEntry())) {
		for (const item of items) await walk(item.webkitGetAsEntry?.() ?? null);
		if (files.length) return files;
	}
	return [...dt.files].filter((f) => isAudioFile(f.name) || f.type.startsWith("audio/"));
}
async function filesFromDirectoryHandle(dir) {
	const files = [];
	const walk = async (handle) => {
		for await (const entry of handle.values()) if (entry.kind === "file") {
			const file = await entry.getFile();
			if (isAudioFile(file.name) || file.type.startsWith("audio/")) files.push(file);
		} else if (entry.kind === "directory") await walk(entry);
	};
	await walk(dir);
	return files;
}
var catalogTracks = /* @__PURE__ */ JSON.parse("[{\"id\":\"catalog:night-drive\",\"title\":\"Night Drive\",\"artist\":\"Lumen Circuit\",\"album\":\"Night Circuits\",\"year\":2024,\"duration\":16.271,\"filename\":\"Lumen Circuit - Night Drive.wav\",\"url\":\"/music/Lumen%20Circuit%20-%20Night%20Drive.wav\",\"coverUrl\":\"/music/covers/night-circuits.jpg\",\"peaks\":[0.487,0.2322,0.4347,0.5249,0.3241,0.8198,0.6121,0.1846,0.5793,0.3343,0.1373,0.8211,0.3259,0.174,0.4953,0.2605,0.8505,0.808,0.952,0.5092,0.3126,0.1338,0.8382,0.4655,0.2222,0.4305,0.3151,0.3013,0.855,0.2901,0.3438,0.5109,0.2181,0.8845,0.6154,0.1862,0.5103,0.3733,0.2515,0.8418,0.851,0.6967,0.4865,0.2026,0.1001,0.7988,0.2262,0.4818,0.3838,0.3728,0.9157,0.6347,0.2027,0.442,0.3417,0.1935,0.8342,0.2643,0.1715,0.5273,0.2537,0.864,0.8662,0.9051,0.4766,0.3596,0.1401,0.8729,0.4634,0.1956,0.4303,0.3979,0.3194,0.8929,0.2873,0.3852,0.4025,0.1909,0.9245,0.6891,0.2097,0.5752,0.3494,0.305,0.9921,0.8625,0.6495,0.3845,0.1779,0.0988,0.7866,0.2323,0.4823,0.4724,0.326,0.8008,0.6106,0.1827,0.5852,0.3349,0.1433,0.8189,0.3268,0.181,0.4935,0.2512,0.8257,0.8125,0.9497,0.5145,0.3326,0.1308,0.8387,0.4668,0.2185,0.4462,0.3124,0.3146,0.86,0.2896,0.4013,0.5201,0.2299,0.9046,0.6102,0.1862,0.4996,0.3681,0.2494,0.8508,0.8537,0.6881,0.4868,0.2136,0.0994,0.7985,0.2264,0.4528,0.3811,0.3896,0.9216,0.6318,0.2027,0.4637,0.35,0.192,0.8522,0.2641,0.1768,0.5189,0.2612,0.8587,0.8651,0.8767,0.4654,0.3696,0.144,0.8726,0.4644,0.203,0.4125,0.4021,0.3143,0.8737,0.2873,0.3708,0.3966,0.2049,0.9111,0.6933,0.2114,0.5052,0.3314,0.3014,1,0.8453,0.6494,0.4322,0.1828,0.0942],\"source\":\"catalog\"},{\"id\":\"catalog:signal-bloom\",\"title\":\"Signal Bloom\",\"artist\":\"Lumen Circuit\",\"album\":\"Night Circuits\",\"year\":2024,\"duration\":15,\"filename\":\"Lumen Circuit - Signal Bloom.wav\",\"url\":\"/music/Lumen%20Circuit%20-%20Signal%20Bloom.wav\",\"coverUrl\":\"/music/covers/night-circuits.jpg\",\"peaks\":[0.515,0.2796,0.943,0.7515,0.2411,0.5187,0.3673,0.3517,0.9558,0.5366,0.1886,0.9552,0.3304,0.2589,0.8673,0.2942,0.4865,0.5033,0.9279,0.303,0.259,0.141,0.8326,0.5312,0.3672,0.9777,0.3145,0.1505,0.4333,0.2732,0.8723,0.9432,0.2363,0.8616,0.7458,0.3823,0.9294,0.5858,0.2374,0.4539,0.8517,0.6803,0.3007,0.1594,0.079,0.9435,0.3008,0.9263,0.8361,0.2167,0.5271,0.3747,0.2573,0.984,0.5092,0.1475,0.8848,0.4286,0.2955,0.9064,0.3006,0.423,0.4893,0.8514,0.2886,0.2321,0.1583,1,0.511,0.2694,0.9661,0.4185,0.1956,0.4666,0.3396,0.7954,0.9473,0.2473,0.9219,0.7893,0.3512,0.8809,0.6168,0.2596,0.6084,0.9248,0.7983,0.2929,0.1688,0.0771,0.9663,0.2844,0.9461,0.7398,0.25,0.5038,0.3717,0.3472,0.9644,0.5373,0.173,0.9425,0.3484,0.2585,0.8841,0.294,0.395,0.5423,0.9416,0.3021,0.2547,0.1318,0.8251,0.5283,0.3597,0.9986,0.3556,0.1608,0.4828,0.2655,0.8918,0.9238,0.256,0.8852,0.7508,0.3754,0.9456,0.5954,0.249,0.4904,0.8061,0.6755,0.3045,0.1594,0.0794,0.9657,0.3033,0.9241,0.8388,0.2181,0.5315,0.4376,0.2524,0.9774,0.5077,0.1552,0.9073,0.4029,0.2911,0.9216,0.3005,0.3906,0.5105,0.8593,0.3172,0.2367,0.1518,0.9757,0.5336,0.2678,0.9369,0.419,0.1968,0.4837,0.3328,0.6297,0.9603,0.2751,0.9442,0.7969,0.3479,0.912,0.6136,0.2686,0.5266,0.9393,0.7839,0.2961,0.1688,0.0776],\"source\":\"catalog\"},{\"id\":\"catalog:ember-sky\",\"title\":\"Ember Sky\",\"artist\":\"Atlas Vale\",\"album\":\"Ember Sky\",\"year\":2023,\"duration\":18.461,\"filename\":\"Atlas Vale - Ember Sky.wav\",\"url\":\"/music/Atlas%20Vale%20-%20Ember%20Sky.wav\",\"coverUrl\":\"/music/covers/ember-sky.jpg\",\"peaks\":[0.52,0.331,0.1808,0.1976,0.1976,0.1432,0.137,0.5191,0.362,0.2104,0.1845,0.3401,0.2433,0.191,0.1343,0.9841,0.3012,0.1259,0.2013,0.2249,0.1782,0.1283,0.5114,0.3795,0.2104,0.1733,0.3105,0.185,0.7802,0.131,0.8353,0.328,0.1772,0.2168,0.1933,0.161,0.126,0.5108,0.3322,0.2169,0.1821,0.3307,0.2488,0.2002,0.1311,0.9193,0.343,0.13,0.2279,0.2018,0.1473,0.1334,0.4958,0.3146,0.2477,0.1918,0.3331,0.1942,0.7835,0.1508,0.8253,0.3193,0.163,0.2217,0.1993,0.1441,0.1211,0.4861,0.356,0.2233,0.167,0.3168,0.256,0.192,0.1272,0.9182,0.3291,0.1266,0.1604,0.1627,0.1663,0.1207,0.4662,0.3481,0.2109,0.1736,0.32,0.1983,0.7949,0.1351,0.8255,0.3035,0.1746,0.2354,0.1942,0.1472,0.1211,0.4719,0.3681,0.2344,0.1709,0.3241,0.2491,0.1874,0.1241,0.8886,0.3097,0.1198,0.23,0.2275,0.1561,0.1273,0.5095,0.3902,0.233,0.1813,0.3196,0.1972,0.795,0.1323,0.882,0.3305,0.1767,0.2187,0.195,0.1515,0.1345,0.4968,0.3423,0.2034,0.182,0.3459,0.2429,0.1913,0.1349,1,0.2983,0.1285,0.2039,0.2153,0.1809,0.1298,0.5082,0.3739,0.2156,0.1802,0.3131,0.1895,0.7862,0.1306,0.837,0.3281,0.1735,0.2183,0.203,0.1567,0.1251,0.5653,0.3612,0.2309,0.1839,0.3317,0.253,0.1962,0.1332,0.9309,0.3401,0.1312,0.2361,0.1962,0.1587,0.1316,0.4911,0.3398,0.2454,0.19,0.3294,0.2075,0.7889,0.1299],\"source\":\"catalog\"},{\"id\":\"catalog:soft-static\",\"title\":\"Soft Static\",\"artist\":\"Mira Kite\",\"album\":\"Tape Loops\",\"year\":2024,\"duration\":22.857,\"filename\":\"Mira Kite - Soft Static.wav\",\"url\":\"/music/Mira%20Kite%20-%20Soft%20Static.wav\",\"coverUrl\":\"/music/covers/tape-loops.jpg\",\"peaks\":[0.5028,0.2874,0.3678,0.3671,0.1585,0.3844,0.3278,0.1555,0.3157,0.2628,0.1515,0.8834,0.2853,0.1491,0.3159,0.2012,0.3919,0.4394,0.8692,0.2982,0.2274,0.0944,0.8834,0.2739,0.1698,0.383,0.2524,0.1359,0.5058,0.2344,0.2045,0.3365,0.2293,0.8886,0.638,0.1917,0.2769,0.1937,0.1495,0.5292,0.7772,0.7538,0.2585,0.1608,0.0489,0.8474,0.2566,0.2942,0.2596,0.1987,0.574,0.3771,0.1596,0.364,0.2412,0.1485,0.9422,0.2942,0.126,0.3602,0.2399,0.5889,0.4868,0.8529,0.3585,0.2768,0.1223,0.9278,0.2881,0.1721,0.4238,0.2984,0.14,0.5389,0.2968,0.2007,0.2889,0.1988,0.994,0.6259,0.2432,0.3132,0.2595,0.1665,0.4989,0.8759,0.71,0.303,0.1543,0.0476,0.8139,0.2903,0.3804,0.365,0.151,0.3908,0.318,0.1556,0.3207,0.2587,0.165,0.8925,0.2857,0.1493,0.3118,0.1986,0.4512,0.4684,0.8613,0.2837,0.2292,0.0994,0.8768,0.2759,0.1666,0.3839,0.2578,0.1383,0.5034,0.2405,0.1896,0.3313,0.2341,0.8869,0.6411,0.1936,0.2734,0.1981,0.141,0.5017,0.776,0.7624,0.2832,0.1628,0.0513,0.8834,0.2683,0.3153,0.2609,0.1955,0.5481,0.357,0.1672,0.352,0.2394,0.1425,0.9591,0.2985,0.1339,0.3456,0.2405,0.5499,0.5286,0.8522,0.3567,0.2791,0.1149,0.8778,0.2776,0.1719,0.4062,0.2985,0.1386,0.5285,0.2957,0.2127,0.2831,0.1996,1,0.6228,0.2405,0.3133,0.2457,0.1936,0.4996,0.8652,0.7109,0.3072,0.1568,0.049],\"source\":\"catalog\"},{\"id\":\"catalog:low-tide\",\"title\":\"Low Tide\",\"artist\":\"Mira Kite\",\"album\":\"Tape Loops\",\"year\":2024,\"duration\":21.333,\"filename\":\"Mira Kite - Low Tide.wav\",\"url\":\"/music/Mira%20Kite%20-%20Low%20Tide.wav\",\"coverUrl\":\"/music/covers/tape-loops.jpg\",\"peaks\":[0.5688,0.3,0.2302,0.1822,0.3973,0.591,0.374,0.1597,0.3584,0.2648,0.1566,0.9867,0.3233,0.1913,0.1646,0.3778,0.5883,0.5433,0.9189,0.3513,0.2714,0.0911,0.9292,0.2648,0.2572,0.1727,0.3091,0.3371,0.6151,0.2707,0.1461,0.3408,0.178,0.9994,0.5988,0.2156,0.1919,0.1428,0.3113,0.6281,0.9909,0.8103,0.2983,0.1613,0.0623,0.9093,0.297,0.2309,0.1748,0.3904,0.5323,0.3563,0.1592,0.3586,0.2684,0.1706,0.9729,0.3212,0.1973,0.1528,0.3725,0.5617,0.5189,0.9186,0.3523,0.2829,0.095,0.9142,0.26,0.239,0.1844,0.4006,0.3509,0.4912,0.2156,0.1918,0.3174,0.2191,0.9662,0.5821,0.1911,0.172,0.1435,0.3355,0.6367,0.8821,0.7773,0.294,0.1781,0.0516,0.9075,0.2945,0.2293,0.1788,0.3938,0.6064,0.3807,0.1571,0.3584,0.2653,0.1752,0.9716,0.3216,0.1939,0.1542,0.3756,0.519,0.5498,0.9125,0.3568,0.2876,0.0929,0.9343,0.2647,0.2742,0.176,0.3044,0.3346,0.5337,0.2398,0.147,0.3317,0.1751,0.9796,0.5949,0.2149,0.1951,0.1446,0.3187,0.6533,1,0.8121,0.2946,0.1571,0.0575,0.8901,0.2888,0.2319,0.1741,0.3932,0.5063,0.3657,0.167,0.3471,0.2586,0.166,0.9753,0.3239,0.2018,0.1578,0.3768,0.6218,0.5529,0.9291,0.3494,0.2808,0.0961,0.9142,0.2839,0.2357,0.1731,0.39,0.3438,0.4762,0.2321,0.1635,0.3178,0.2216,0.9515,0.6057,0.1928,0.167,0.1475,0.3329,0.5815,0.8852,0.8872,0.2934,0.1787,0.0475],\"source\":\"catalog\"},{\"id\":\"catalog:copper-hours\",\"title\":\"Copper Hours\",\"artist\":\"Redline Duo\",\"album\":\"Copper Hours\",\"year\":2025,\"duration\":18.823,\"filename\":\"Redline Duo - Copper Hours.wav\",\"url\":\"/music/Redline%20Duo%20-%20Copper%20Hours.wav\",\"coverUrl\":\"/music/covers/copper-hours.jpg\",\"peaks\":[0.58,0.3469,0.5498,0.4192,0.3904,0.821,0.4786,0.247,0.585,0.3115,0.1322,0.8264,0.3081,0.2902,0.4669,0.3637,0.788,0.8015,0.8564,0.5561,0.4053,0.1148,0.9847,0.5124,0.3166,0.4517,0.3787,0.3387,0.967,0.249,0.3657,0.4605,0.1825,0.984,0.6276,0.2529,0.4707,0.2449,0.3524,0.9114,0.8706,0.7549,0.4498,0.24,0.016,0.825,0.285,0.4665,0.3982,0.3907,0.8701,0.524,0.2328,0.5345,0.328,0.13,0.8644,0.3138,0.2258,0.4717,0.2664,0.801,0.795,0.8645,0.5211,0.4206,0.1178,0.9001,0.5322,0.2748,0.4561,0.3334,0.3246,0.9181,0.261,0.3845,0.5573,0.1984,0.9123,0.6723,0.2865,0.4108,0.2672,0.3379,0.9636,0.822,0.841,0.5197,0.2055,0.0187,0.8326,0.3469,0.5447,0.4288,0.3815,0.7895,0.5728,0.2361,0.6154,0.317,0.1321,0.8431,0.3076,0.2902,0.4138,0.3623,0.825,0.8084,0.8591,0.4936,0.3859,0.1152,0.9838,0.5357,0.3192,0.4471,0.3538,0.3852,0.9771,0.2501,0.4229,0.4396,0.1824,1,0.6402,0.2509,0.48,0.3332,0.3482,0.9215,0.8682,0.8115,0.4751,0.2324,0.018,0.819,0.2833,0.48,0.4102,0.3886,0.8712,0.5258,0.235,0.5733,0.3272,0.1401,0.8546,0.3136,0.2331,0.3928,0.2879,0.7741,0.7862,0.8592,0.5869,0.4657,0.135,0.8772,0.5309,0.2775,0.4001,0.3295,0.3248,0.932,0.2584,0.1193,0.5384,0.2063,0.9258,0.6683,0.2831,0.372,0.2621,0.3383,0.9565,0.8219,0.8255,0.524,0.2316,0.0194],\"source\":\"catalog\"},{\"id\":\"catalog:afterglow\",\"title\":\"Afterglow\",\"artist\":\"Solenne\",\"album\":\"Afterglow\",\"year\":2024,\"duration\":20,\"filename\":\"Solenne - Afterglow.wav\",\"url\":\"/music/Solenne%20-%20Afterglow.wav\",\"coverUrl\":\"/music/covers/afterglow.jpg\",\"peaks\":[0.5418,0.3382,0.4305,0.3861,0.2225,0.6312,0.4656,0.173,0.4362,0.3512,0.1412,0.959,0.3379,0.1345,0.452,0.2709,0.5522,0.5959,0.2647,0.2993,0.2639,0.8633,0.872,0.3949,0.2496,0.4523,0.3463,0.1307,0.5356,0.2832,0.2898,0.4105,0.2634,1,0.6451,0.1875,0.4664,0.3415,0.1544,0.5357,0.3403,0.1722,0.3359,0.8553,0.4385,0.9741,0.3233,0.4721,0.4497,0.2313,0.6107,0.5117,0.1701,0.4262,0.3103,0.1356,0.986,0.3467,0.1354,0.434,0.2406,0.5503,0.5374,0.3063,0.3072,0.2737,0.8557,0.9384,0.4283,0.2406,0.4344,0.2898,0.1361,0.6185,0.2939,0.3223,0.4162,0.2319,0.9613,0.7251,0.2301,0.4642,0.3804,0.2047,0.662,0.3519,0.1823,0.3216,0.8429,0.4381,0.8862,0.3381,0.4313,0.3837,0.2195,0.7162,0.4482,0.184,0.4348,0.3499,0.1343,0.9731,0.3388,0.1293,0.4732,0.2729,0.5316,0.5507,0.279,0.3105,0.2674,0.8425,0.8777,0.3975,0.2437,0.4508,0.3486,0.1295,0.5028,0.2721,0.2864,0.4067,0.2634,0.9935,0.6409,0.1859,0.4475,0.3406,0.1562,0.5072,0.351,0.1704,0.342,0.8461,0.4425,0.9751,0.3209,0.4772,0.4524,0.2336,0.5875,0.5174,0.1715,0.4241,0.3112,0.1428,0.9991,0.3448,0.135,0.4324,0.2402,0.5642,0.5465,0.3144,0.3079,0.276,0.8426,0.9355,0.4262,0.238,0.4262,0.2931,0.1268,0.6488,0.2669,0.3157,0.4241,0.2298,0.968,0.7274,0.229,0.4502,0.3717,0.2044,0.6571,0.3932,0.1798,0.3141,0.8424,0.434],\"source\":\"catalog\"},{\"id\":\"catalog:glass-harbor\",\"title\":\"Glass Harbor\",\"artist\":\"North Window\",\"album\":\"Harbor Sessions\",\"year\":2023,\"duration\":17.455,\"filename\":\"North Window - Glass Harbor.wav\",\"url\":\"/music/North%20Window%20-%20Glass%20Harbor.wav\",\"coverUrl\":\"/music/covers/harbor-sessions.jpg\",\"peaks\":[0.5569,0.2143,0.4966,0.4289,0.3733,0.9449,0.6397,0.2231,0.4867,0.3023,0.1705,0.8312,0.3315,0.1518,0.5491,0.3015,0.8828,0.8996,0.8647,0.5592,0.4335,0.125,0.8841,0.5173,0.2051,0.4565,0.2992,0.2335,0.9847,0.2601,0.3539,0.49,0.1937,0.9131,0.6731,0.2247,0.5034,0.3224,0.2993,0.9346,0.8653,0.692,0.5135,0.1862,0.0684,0.9419,0.2337,0.4798,0.4961,0.2941,0.9487,0.5412,0.1834,0.4706,0.2911,0.1394,0.9297,0.3165,0.152,0.5188,0.2916,0.9201,0.9406,0.8987,0.5431,0.4233,0.1544,0.8659,0.5066,0.1821,0.3947,0.2514,0.2873,0.932,0.2171,0.4172,0.4966,0.1989,0.8567,0.766,0.2641,0.3992,0.3433,0.3349,0.8948,0.8729,0.651,0.4765,0.1799,0.0758,0.8346,0.2157,0.475,0.4238,0.3779,0.9439,0.6378,0.2231,0.5201,0.2982,0.168,0.8477,0.3313,0.1537,0.5106,0.2985,0.8946,0.8782,0.8713,0.544,0.3767,0.124,0.9039,0.5162,0.2068,0.4427,0.25,0.2432,1,0.2601,0.3583,0.4529,0.2043,0.9244,0.668,0.2233,0.5376,0.3484,0.2862,0.923,0.846,0.6951,0.5168,0.1856,0.0665,0.9406,0.2337,0.4749,0.5172,0.2852,0.9351,0.5384,0.1834,0.5196,0.3258,0.1423,0.9178,0.3171,0.1493,0.5199,0.2919,0.9327,0.9101,0.8831,0.5172,0.4423,0.1486,0.8802,0.5077,0.1793,0.3995,0.3276,0.2835,0.9382,0.2251,0.3971,0.5069,0.1983,0.8722,0.7469,0.2626,0.3894,0.3173,0.3295,0.8916,0.8587,0.6554,0.4748,0.1845,0.0769],\"source\":\"catalog\"},{\"id\":\"catalog:dustlight\",\"title\":\"Dustlight\",\"artist\":\"Kite & Ash\",\"album\":\"Dustlight\",\"year\":2025,\"duration\":21.818,\"filename\":\"Kite & Ash - Dustlight.wav\",\"url\":\"/music/Kite%20%26%20Ash%20-%20Dustlight.wav\",\"coverUrl\":\"/music/covers/dustlight.jpg\",\"peaks\":[0.5659,0.286,0.2426,0.2817,0.2287,0.4395,0.3464,0.181,0.3284,0.2681,0.1691,0.9054,0.3267,0.1338,0.3728,0.2028,0.5026,0.538,0.9011,0.3092,0.2465,0.107,0.8964,0.3075,0.1875,0.3032,0.258,0.2257,0.563,0.2582,0.1701,0.4341,0.2044,0.9299,0.6682,0.2449,0.4501,0.2682,0.1812,0.5797,0.8503,0.7741,0.3789,0.177,0.0457,0.9455,0.2381,0.3052,0.2854,0.2409,0.5307,0.3742,0.178,0.3644,0.2391,0.1558,1,0.3379,0.1413,0.318,0.2054,0.56,0.4981,0.8897,0.3216,0.361,0.1157,0.8611,0.3201,0.195,0.2823,0.2457,0.2278,0.4492,0.244,0.1825,0.3377,0.2294,0.8891,0.7209,0.1917,0.3775,0.2835,0.1428,0.5154,0.8853,0.8282,0.3126,0.1717,0.0389,0.8654,0.2866,0.2596,0.2761,0.2304,0.4389,0.4029,0.1796,0.3407,0.2675,0.1735,0.8901,0.3268,0.1389,0.377,0.2037,0.5034,0.4811,0.9041,0.3142,0.2498,0.105,0.8585,0.3014,0.1875,0.3101,0.2572,0.2289,0.5469,0.2484,0.1491,0.4217,0.2056,0.918,0.6598,0.2446,0.4399,0.2768,0.1452,0.5696,0.6812,0.8433,0.3764,0.1826,0.0571,0.9359,0.2361,0.3204,0.2779,0.2431,0.5443,0.3627,0.1692,0.3595,0.2438,0.1535,0.9681,0.3372,0.155,0.3217,0.2068,0.488,0.5791,0.8964,0.3314,0.3626,0.1173,0.8587,0.3345,0.1921,0.2781,0.243,0.2263,0.4539,0.2522,0.1439,0.3324,0.2304,0.8776,0.7291,0.1926,0.3797,0.2837,0.1426,0.5123,0.3312,0.9107,0.3138,0.1752,0.0303],\"source\":\"catalog\"},{\"id\":\"catalog:red-hour\",\"title\":\"Red Hour\",\"artist\":\"Vesper Unit\",\"album\":\"Red Hour\",\"year\":2024,\"duration\":14.545,\"filename\":\"Vesper Unit - Red Hour.wav\",\"url\":\"/music/Vesper%20Unit%20-%20Red%20Hour.wav\",\"coverUrl\":\"/music/covers/red-hour.jpg\",\"peaks\":[0.5472,0.3534,0.9683,0.7855,0.2662,0.4641,0.3505,0.2907,1,0.5135,0.2732,0.9437,0.2911,0.2557,0.9241,0.2862,0.5103,0.5769,0.9166,0.3042,0.251,0.2101,0.9094,0.5346,0.316,0.9033,0.521,0.2082,0.4626,0.3237,0.8999,0.9396,0.3029,0.9343,0.7891,0.2559,0.9408,0.5607,0.2882,0.4374,0.9847,0.7851,0.3628,0.2315,0.1825,0.9087,0.4118,0.9434,0.8464,0.2489,0.5013,0.4205,0.3472,0.9077,0.5363,0.3305,0.8788,0.3659,0.2324,0.9643,0.307,0.4193,0.5198,0.8043,0.3705,0.2345,0.2358,0.8713,0.5039,0.3371,0.9748,0.4982,0.2197,0.5276,0.2285,0.9604,0.9307,0.2977,0.9144,0.8427,0.2829,0.9463,0.5563,0.2754,0.5393,0.892,0.7829,0.2564,0.236,0.1981,0.9763,0.3492,0.9222,0.8809,0.26,0.4934,0.3606,0.2834,0.9943,0.5178,0.2713,0.9064,0.3024,0.2559,0.9176,0.2948,0.4787,0.6136,0.9159,0.4098,0.2488,0.2114,0.8945,0.5871,0.3211,0.9449,0.5195,0.2127,0.4799,0.3255,0.376,0.9558,0.3034,0.909,0.7992,0.2581,0.9543,0.5626,0.289,0.4487,0.9709,0.7924,0.3688,0.2236,0.1934,0.8852,0.4095,0.9585,0.9154,0.2739,0.4953,0.3933,0.3695,0.8938,0.5361,0.3165,0.9136,0.3568,0.2318,0.977,0.3134,0.3689,0.467,0.8467,0.4863,0.264,0.2388,0.85,0.5741,0.3308,0.9139,0.4926,0.224,0.5461,0.2411,0.2408,0.9075,0.3006,0.9339,0.8434,0.2689,0.9646,0.551,0.2794,0.4746,0.9092,0.8326,0.2544,0.2342,0.2097],\"source\":\"catalog\"}]");
function isBrowser() {
	return typeof window !== "undefined";
}
var AudioEngine = class {
	audio = null;
	ctx = null;
	analyser = null;
	source = null;
	gain = null;
	timeHandlers = /* @__PURE__ */ new Set();
	endedHandlers = /* @__PURE__ */ new Set();
	errorHandlers = /* @__PURE__ */ new Set();
	loadedUrl = null;
	raf = 0;
	get element() {
		if (!isBrowser()) return null;
		if (!this.audio) {
			const a = new Audio();
			a.preload = "auto";
			a.crossOrigin = "anonymous";
			a.addEventListener("timeupdate", this.emitTime);
			a.addEventListener("durationchange", this.emitTime);
			a.addEventListener("ended", () => {
				this.endedHandlers.forEach((h) => h());
			});
			a.addEventListener("error", () => {
				const msg = a.error?.message || "This file could not be played.";
				this.errorHandlers.forEach((h) => h(msg));
			});
			this.audio = a;
		}
		return this.audio;
	}
	emitTime = () => {
		const a = this.audio;
		if (!a) return;
		const dur = Number.isFinite(a.duration) ? a.duration : 0;
		this.timeHandlers.forEach((h) => h(a.currentTime || 0, dur));
	};
	tick = () => {
		this.emitTime();
		if (this.audio && !this.audio.paused) this.raf = requestAnimationFrame(this.tick);
	};
	async ensureGraph() {
		const a = this.element;
		if (!a || this.source) return;
		try {
			const ctx = new AudioContext();
			const source = ctx.createMediaElementSource(a);
			const gain = ctx.createGain();
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 256;
			source.connect(gain);
			gain.connect(analyser);
			analyser.connect(ctx.destination);
			this.ctx = ctx;
			this.source = source;
			this.gain = gain;
			this.analyser = analyser;
		} catch {}
	}
	async load(url, startAt = 0) {
		const a = this.element;
		if (!a) return;
		if (this.loadedUrl !== url) {
			a.src = url;
			this.loadedUrl = url;
			try {
				a.load();
			} catch {}
		}
		if (startAt > 0) {
			const seek = () => {
				try {
					a.currentTime = startAt;
				} catch {}
			};
			if (a.readyState >= 1) seek();
			else a.addEventListener("loadedmetadata", seek, { once: true });
		}
	}
	async play() {
		const a = this.element;
		if (!a) return;
		await this.ensureGraph();
		if (this.ctx?.state === "suspended") try {
			await this.ctx.resume();
		} catch {}
		try {
			await a.play();
			cancelAnimationFrame(this.raf);
			this.raf = requestAnimationFrame(this.tick);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Playback failed.";
			this.errorHandlers.forEach((h) => h(message));
		}
	}
	pause() {
		this.audio?.pause();
		cancelAnimationFrame(this.raf);
	}
	seek(seconds) {
		const a = this.audio;
		if (!a || !Number.isFinite(seconds)) return;
		try {
			a.currentTime = Math.max(0, seconds);
			this.emitTime();
		} catch {}
	}
	setVolume(volume, muted) {
		const v = Math.min(1, Math.max(0, volume));
		if (this.gain) this.gain.gain.value = muted ? 0 : v;
		if (this.audio) {
			this.audio.volume = muted ? 0 : v;
			this.audio.muted = muted;
		}
	}
	getAnalyser() {
		return this.analyser;
	}
	getCurrentUrl() {
		return this.loadedUrl;
	}
	onTime(handler) {
		this.timeHandlers.add(handler);
		return () => {
			this.timeHandlers.delete(handler);
		};
	}
	onEnded(handler) {
		this.endedHandlers.add(handler);
		return () => {
			this.endedHandlers.delete(handler);
		};
	}
	onError(handler) {
		this.errorHandlers.add(handler);
		return () => {
			this.errorHandlers.delete(handler);
		};
	}
};
var engine = new AudioEngine();
var STORAGE_KEY = "ember-player-v1";
function loadPersisted() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function shuffleInPlace(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
function currentIndex(queue, currentUid) {
	if (!currentUid) return -1;
	return queue.findIndex((q) => q.uid === currentUid);
}
function rebuildBag(queue, currentUid) {
	return shuffleInPlace(queue.filter((q) => q.uid !== currentUid).map((q) => q.uid));
}
var usePlayerStore = create((set, get) => ({
	tracks: catalogTracks,
	queue: [],
	currentUid: null,
	isPlaying: false,
	currentTime: 0,
	duration: 0,
	volume: .85,
	muted: false,
	shuffle: false,
	shufflePending: [],
	repeat: "off",
	favorites: [],
	recentlyPlayed: [],
	view: "home",
	libraryTab: "all",
	displayMode: "list",
	queueOpen: true,
	search: "",
	hydrated: false,
	selectedAlbum: null,
	selectedArtist: null,
	errorTrackId: null,
	persist: () => {
		if (typeof window === "undefined") return;
		const s = get();
		const data = {
			volume: s.volume,
			muted: s.muted,
			shuffle: s.shuffle,
			repeat: s.repeat,
			favorites: s.favorites,
			recentlyPlayed: s.recentlyPlayed,
			queue: s.queue,
			currentUid: s.currentUid,
			currentTime: s.currentTime,
			view: s.view,
			libraryTab: s.libraryTab,
			displayMode: s.displayMode,
			queueOpen: s.queueOpen
		};
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch {}
	},
	hydrate: async () => {
		const saved = loadPersisted();
		const objectUrls = [];
		if (typeof indexedDB !== "undefined") try {
			const rows = await idbGetAll();
			for (const row of rows) {
				const audio = URL.createObjectURL(row.audioBlob);
				const cover = row.coverBlob ? URL.createObjectURL(row.coverBlob) : placeholderCover(row.id, row.title, row.artist);
				objectUrls.push(storedToTrack(row, {
					audio,
					cover
				}));
			}
		} catch {}
		const tracks = [...catalogTracks, ...objectUrls];
		const known = new Set(tracks.map((t) => t.id));
		const queue = (saved.queue ?? []).filter((q) => known.has(q.trackId));
		let currentUid = saved.currentUid ?? null;
		if (currentUid && !queue.some((q) => q.uid === currentUid)) currentUid = queue[0]?.uid ?? null;
		const shuffle = saved.shuffle ?? false;
		set({
			tracks,
			volume: saved.volume ?? .85,
			muted: saved.muted ?? false,
			shuffle,
			repeat: saved.repeat ?? "off",
			favorites: (saved.favorites ?? []).filter((id) => known.has(id)),
			recentlyPlayed: (saved.recentlyPlayed ?? []).filter((e) => known.has(e.id)),
			queue,
			currentUid,
			currentTime: saved.currentTime ?? 0,
			view: saved.view ?? "home",
			libraryTab: saved.libraryTab ?? "all",
			displayMode: saved.displayMode ?? "list",
			queueOpen: saved.queueOpen ?? true,
			shufflePending: shuffle ? rebuildBag(queue, currentUid) : [],
			hydrated: true
		});
		engine.setVolume(saved.volume ?? .85, saved.muted ?? false);
		const current = tracks.find((t) => t.id === queue.find((q) => q.uid === currentUid)?.trackId);
		if (current) {
			await engine.load(current.url, saved.currentTime ?? 0);
			set({ duration: current.duration });
		}
	},
	addTracks: (incoming) => {
		set((s) => {
			const existing = new Set(s.tracks.map((t) => t.filename + t.duration));
			const extra = incoming.filter((t) => !existing.has(t.filename + t.duration) || t.source === "import");
			return { tracks: [...s.tracks, ...extra] };
		});
		get().persist();
	},
	removeImported: async (id) => {
		await idbDelete(id);
		set((s) => {
			const tracks = s.tracks.filter((t) => t.id !== id);
			const queue = s.queue.filter((q) => q.trackId !== id);
			return {
				tracks,
				queue,
				currentUid: queue.some((q) => q.uid === s.currentUid) ? s.currentUid : queue[0]?.uid ?? null,
				favorites: s.favorites.filter((f) => f !== id)
			};
		});
		get().persist();
	},
	clearImported: async () => {
		await idbClear();
		set((s) => {
			const tracks = s.tracks.filter((t) => t.source === "catalog");
			const known = new Set(tracks.map((t) => t.id));
			const queue = s.queue.filter((q) => known.has(q.trackId));
			return {
				tracks,
				queue,
				currentUid: queue.some((q) => q.uid === s.currentUid) ? s.currentUid : queue[0]?.uid ?? null,
				favorites: s.favorites.filter((id) => known.has(id))
			};
		});
		get().persist();
	},
	setView: (view) => {
		set({
			view,
			selectedAlbum: null,
			selectedArtist: null
		});
		get().persist();
	},
	setLibraryTab: (libraryTab) => {
		set({
			libraryTab,
			selectedAlbum: null,
			selectedArtist: null
		});
		get().persist();
	},
	setDisplayMode: (displayMode) => {
		set({ displayMode });
		get().persist();
	},
	setSearch: (search) => set({ search }),
	setQueueOpen: (queueOpen) => {
		set({ queueOpen });
		get().persist();
	},
	setSelectedAlbum: (selectedAlbum) => set({
		selectedAlbum,
		selectedArtist: null
	}),
	setSelectedArtist: (selectedArtist) => set({
		selectedArtist,
		selectedAlbum: null
	}),
	playTrack: (track, context) => {
		const s = get();
		const queue = (context && context.length ? context : [track]).map((t) => ({
			uid: uid(),
			trackId: t.id
		}));
		const match = queue.find((q) => q.trackId === track.id) ?? queue[0];
		const recentlyPlayed = [{
			id: track.id,
			at: Date.now()
		}, ...s.recentlyPlayed.filter((e) => e.id !== track.id)].slice(0, 40);
		set({
			queue,
			currentUid: match.uid,
			isPlaying: true,
			currentTime: 0,
			duration: track.duration,
			errorTrackId: null,
			recentlyPlayed,
			shufflePending: s.shuffle ? rebuildBag(queue, match.uid) : []
		});
		engine.setVolume(s.volume, s.muted);
		engine.load(track.url, 0).then(() => engine.play());
		get().persist();
	},
	togglePlay: () => {
		const s = get();
		if (!s.currentUid) {
			const first = s.tracks[0];
			if (first) get().playTrack(first, s.tracks);
			return;
		}
		if (s.isPlaying) {
			engine.pause();
			set({ isPlaying: false });
		} else {
			const item = s.queue.find((q) => q.uid === s.currentUid);
			const track = s.tracks.find((t) => t.id === item?.trackId);
			if (track) {
				engine.setVolume(s.volume, s.muted);
				engine.load(track.url, s.currentTime).then(() => engine.play());
				set({ isPlaying: true });
			}
		}
		get().persist();
	},
	next: () => {
		const s = get();
		if (!s.queue.length) return;
		if (s.repeat === "one" && s.currentUid) {
			engine.seek(0);
			engine.play();
			set({
				currentTime: 0,
				isPlaying: true
			});
			return;
		}
		const idx = currentIndex(s.queue, s.currentUid);
		let nextItem;
		let pending = s.shufflePending;
		if (s.shuffle) {
			if (pending.length === 0) {
				if (s.repeat === "queue") pending = rebuildBag(s.queue, s.currentUid);
				else {
					engine.pause();
					set({ isPlaying: false });
					get().persist();
					return;
				}
			}
			if (pending.length === 0) nextItem = s.queue[idx] ?? s.queue[0];
			else {
				const uidNext = pending[0];
				pending = pending.slice(1);
				nextItem = s.queue.find((q) => q.uid === uidNext);
			}
		} else if (idx >= 0 && idx + 1 < s.queue.length) nextItem = s.queue[idx + 1];
		else if (s.repeat === "queue") nextItem = s.queue[0];
		else {
			engine.pause();
			set({ isPlaying: false });
			get().persist();
			return;
		}
		if (!nextItem) return;
		const track = s.tracks.find((t) => t.id === nextItem.trackId);
		if (!track) return;
		const recentlyPlayed = [{
			id: track.id,
			at: Date.now()
		}, ...s.recentlyPlayed.filter((e) => e.id !== track.id)].slice(0, 40);
		set({
			currentUid: nextItem.uid,
			isPlaying: true,
			currentTime: 0,
			duration: track.duration,
			shufflePending: pending,
			recentlyPlayed,
			errorTrackId: null
		});
		engine.setVolume(s.volume, s.muted);
		engine.load(track.url, 0).then(() => engine.play());
		get().persist();
	},
	prev: () => {
		const s = get();
		if (s.currentTime > 3) {
			engine.seek(0);
			set({ currentTime: 0 });
			get().persist();
			return;
		}
		const idx = currentIndex(s.queue, s.currentUid);
		if (idx <= 0) {
			engine.seek(0);
			set({ currentTime: 0 });
			return;
		}
		const prevItem = s.queue[idx - 1];
		const track = s.tracks.find((t) => t.id === prevItem.trackId);
		if (!track) return;
		set({
			currentUid: prevItem.uid,
			currentTime: 0,
			duration: track.duration,
			isPlaying: true,
			errorTrackId: null
		});
		engine.setVolume(s.volume, s.muted);
		engine.load(track.url, 0).then(() => engine.play());
		get().persist();
	},
	seek: (t) => {
		engine.seek(t);
		set({ currentTime: t });
		get().persist();
	},
	setVolume: (v) => {
		const volume = Math.min(1, Math.max(0, v));
		const muted = volume === 0 ? true : get().muted && volume > 0 ? false : get().muted;
		engine.setVolume(volume, muted);
		set({
			volume,
			muted
		});
		get().persist();
	},
	toggleMute: () => {
		const s = get();
		const muted = !s.muted;
		engine.setVolume(s.volume, muted);
		set({ muted });
		get().persist();
	},
	toggleShuffle: () => {
		const s = get();
		const shuffle = !s.shuffle;
		set({
			shuffle,
			shufflePending: shuffle ? rebuildBag(s.queue, s.currentUid) : []
		});
		get().persist();
	},
	cycleRepeat: () => {
		const order = [
			"off",
			"queue",
			"one"
		];
		const next = order[(order.indexOf(get().repeat) + 1) % order.length];
		set({ repeat: next });
		get().persist();
	},
	toggleFavorite: (id) => {
		set((s) => ({ favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id] }));
		get().persist();
	},
	addToQueue: (track) => {
		const item = {
			uid: uid(),
			trackId: track.id
		};
		set((s) => {
			return {
				queue: [...s.queue, item],
				currentUid: s.currentUid ?? item.uid,
				shufflePending: s.shuffle ? [...s.shufflePending, item.uid] : s.shufflePending
			};
		});
		get().persist();
	},
	playNext: (track) => {
		const item = {
			uid: uid(),
			trackId: track.id
		};
		set((s) => {
			const idx = currentIndex(s.queue, s.currentUid);
			const queue = [...s.queue];
			queue.splice(idx + 1, 0, item);
			return {
				queue,
				currentUid: s.currentUid ?? item.uid,
				shufflePending: s.shuffle ? [item.uid, ...s.shufflePending] : s.shufflePending
			};
		});
		get().persist();
	},
	removeFromQueue: (itemUid) => {
		const s = get();
		const wasCurrent = s.currentUid === itemUid;
		const idx = currentIndex(s.queue, itemUid);
		const queue = s.queue.filter((q) => q.uid !== itemUid);
		const shufflePending = s.shufflePending.filter((id) => id !== itemUid);
		if (!wasCurrent) {
			set({
				queue,
				shufflePending
			});
			get().persist();
			return;
		}
		if (!queue.length) {
			engine.pause();
			set({
				queue,
				currentUid: null,
				isPlaying: false,
				currentTime: 0,
				shufflePending: []
			});
			get().persist();
			return;
		}
		const nextItem = queue[Math.min(Math.max(idx, 0), queue.length - 1)];
		const track = s.tracks.find((t) => t.id === nextItem.trackId);
		set({
			queue,
			currentUid: nextItem.uid,
			shufflePending,
			currentTime: 0,
			duration: track?.duration ?? 0
		});
		if (track && s.isPlaying) engine.load(track.url, 0).then(() => engine.play());
		get().persist();
	},
	clearQueue: () => {
		engine.pause();
		set({
			queue: [],
			currentUid: null,
			isPlaying: false,
			currentTime: 0,
			shufflePending: []
		});
		get().persist();
	},
	moveQueueItem: (from, to) => {
		set((s) => {
			if (from === to || from < 0 || to < 0 || from >= s.queue.length || to >= s.queue.length) return s;
			const queue = [...s.queue];
			const [item] = queue.splice(from, 1);
			if (!item) return s;
			queue.splice(to, 0, item);
			return { queue };
		});
		get().persist();
	},
	jumpToQueueItem: (itemUid) => {
		const s = get();
		const item = s.queue.find((q) => q.uid === itemUid);
		if (!item) return;
		const track = s.tracks.find((t) => t.id === item.trackId);
		if (!track) return;
		const recentlyPlayed = [{
			id: track.id,
			at: Date.now()
		}, ...s.recentlyPlayed.filter((e) => e.id !== track.id)].slice(0, 40);
		set({
			currentUid: itemUid,
			isPlaying: true,
			currentTime: 0,
			duration: track.duration,
			recentlyPlayed,
			errorTrackId: null,
			shufflePending: s.shuffle ? rebuildBag(s.queue, itemUid) : s.shufflePending
		});
		engine.setVolume(s.volume, s.muted);
		engine.load(track.url, 0).then(() => engine.play());
		get().persist();
	},
	setTime: (currentTime, duration) => {
		set((s) => ({
			currentTime,
			duration: duration > 0 ? duration : s.duration
		}));
	},
	handleEnded: () => {
		if (get().repeat === "one") {
			engine.seek(0);
			engine.play();
			set({
				currentTime: 0,
				isPlaying: true
			});
			return;
		}
		get().next();
	},
	handleError: () => {
		const s = get();
		set({
			errorTrackId: s.queue.find((q) => q.uid === s.currentUid)?.trackId ?? null,
			isPlaying: false
		});
		window.setTimeout(() => get().next(), 600);
	}
}));
function selectCurrentTrack(s) {
	const item = s.queue.find((q) => q.uid === s.currentUid);
	if (!item) return void 0;
	return s.tracks.find((t) => t.id === item.trackId);
}
function DropOverlay() {
	const [active, setActive] = (0, import_react.useState)(false);
	const addTracks = usePlayerStore((s) => s.addTracks);
	(0, import_react.useEffect)(() => {
		let depth = 0;
		const onEnter = (e) => {
			if (!e.dataTransfer?.types?.includes("Files")) return;
			e.preventDefault();
			depth += 1;
			setActive(true);
		};
		const onOver = (e) => {
			if (!e.dataTransfer?.types?.includes("Files")) return;
			e.preventDefault();
			e.dataTransfer.dropEffect = "copy";
		};
		const onLeave = (e) => {
			if (!e.dataTransfer?.types?.includes("Files")) return;
			e.preventDefault();
			depth = Math.max(0, depth - 1);
			if (depth === 0) setActive(false);
		};
		const onDrop = (e) => {
			e.preventDefault();
			depth = 0;
			setActive(false);
			const dt = e.dataTransfer;
			if (!dt) return;
			(async () => {
				const files = await filesFromDataTransfer(dt);
				if (!files.length) {
					toast.message("No audio files in that drop");
					return;
				}
				const result = await importAudioFiles(files);
				if (result.tracks.length) {
					addTracks(result.tracks);
					toast.success(`Added ${result.tracks.length} track${result.tracks.length === 1 ? "" : "s"}`);
				}
				for (const err of result.errors) toast.error(err.name, { description: err.message });
			})();
		};
		window.addEventListener("dragenter", onEnter);
		window.addEventListener("dragover", onOver);
		window.addEventListener("dragleave", onLeave);
		window.addEventListener("drop", onDrop);
		return () => {
			window.removeEventListener("dragenter", onEnter);
			window.removeEventListener("dragover", onOver);
			window.removeEventListener("dragleave", onLeave);
			window.removeEventListener("drop", onDrop);
		};
	}, [addTracks]);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-overlay flex items-center justify-center bg-bg/80 p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-dashed border-accent px-8 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-semibold",
				children: "Drop to add"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-fg-muted",
				children: "MP3, WAV, FLAC, OGG, and M4A files join your library."
			})]
		})
	});
}
function isTypingTarget(el) {
	if (!(el instanceof HTMLElement)) return false;
	const tag = el.tagName;
	if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
	return el.isContentEditable;
}
function KeyboardShortcuts() {
	const togglePlay = usePlayerStore((s) => s.togglePlay);
	const next = usePlayerStore((s) => s.next);
	const prev = usePlayerStore((s) => s.prev);
	const setVolume = usePlayerStore((s) => s.setVolume);
	const toggleMute = usePlayerStore((s) => s.toggleMute);
	const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
	const cycleRepeat = usePlayerStore((s) => s.cycleRepeat);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			if (isTypingTarget(e.target)) return;
			switch (e.key) {
				case " ":
					e.preventDefault();
					togglePlay();
					break;
				case "ArrowLeft":
					e.preventDefault();
					prev();
					break;
				case "ArrowRight":
					e.preventDefault();
					next();
					break;
				case "ArrowUp":
					e.preventDefault();
					setVolume(Math.min(1, usePlayerStore.getState().volume + .05));
					break;
				case "ArrowDown":
					e.preventDefault();
					setVolume(Math.max(0, usePlayerStore.getState().volume - .05));
					break;
				case "m":
				case "M":
					toggleMute();
					break;
				case "s":
				case "S":
					toggleShuffle();
					break;
				case "r":
				case "R": cycleRepeat();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		togglePlay,
		next,
		prev,
		setVolume,
		toggleMute,
		toggleShuffle,
		cycleRepeat
	]);
	return null;
}
var sizes = {
	sm: "size-10 rounded-sm",
	md: "size-12 rounded-md",
	lg: "size-16 rounded-md",
	xl: "size-56 rounded-xl sm:size-64"
};
function CoverArt({ track, size = "md", playing, showPlay, className }) {
	const src = track.coverUrl || placeholderCover(track.id, track.title, track.artist);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative shrink-0 overflow-hidden bg-surface-elevated", sizes[size], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			draggable: false,
			className: "size-full object-cover"
		}), showPlay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("absolute inset-0 flex items-center justify-center bg-bg/40 transition-opacity duration-150", playing ? "opacity-100" : "opacity-0 group-hover:opacity-100"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-8 items-center justify-center rounded-full bg-accent text-accent-fg shadow-panel",
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" })
			})
		}) : null]
	});
}
function PlayingBars({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex h-3 items-end gap-0.5", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eq-bar w-0.5 rounded-full bg-accent",
				style: { height: "100%" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eq-bar w-0.5 rounded-full bg-accent",
				style: { height: "70%" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eq-bar w-0.5 rounded-full bg-accent",
				style: { height: "90%" }
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,opacity,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent-hover",
			secondary: "bg-surface-elevated text-fg border border-border hover:bg-surface-hover",
			ghost: "text-fg-muted hover:text-fg hover:bg-surface-hover",
			outline: "border border-border text-fg hover:bg-surface-hover",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-10",
			"icon-sm": "size-8",
			"icon-lg": "size-12"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none", "focus:bg-surface-hover data-[state=open]:bg-surface-hover", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto size-4" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-modal min-w-40 overflow-hidden rounded-lg border border-border bg-surface-elevated p-1 text-fg shadow-panel", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-modal min-w-48 overflow-hidden rounded-lg border border-border bg-surface-elevated p-1 text-fg shadow-panel", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none", "focus:bg-surface-hover focus:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-40", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-pointer items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none select-none focus:bg-surface-hover", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-xs font-medium text-fg-muted", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
function TrackRow({ track, context, index, inQueue, queueUid }) {
	const current = usePlayerStore(selectCurrentTrack);
	const isPlaying = usePlayerStore((s) => s.isPlaying);
	const favorites = usePlayerStore((s) => s.favorites);
	const playTrack = usePlayerStore((s) => s.playTrack);
	const togglePlay = usePlayerStore((s) => s.togglePlay);
	const addToQueue = usePlayerStore((s) => s.addToQueue);
	const playNext = usePlayerStore((s) => s.playNext);
	const toggleFavorite = usePlayerStore((s) => s.toggleFavorite);
	const removeFromQueue = usePlayerStore((s) => s.removeFromQueue);
	const currentUid = usePlayerStore((s) => s.currentUid);
	const jumpToQueueItem = usePlayerStore((s) => s.jumpToQueueItem);
	const isCurrent = current?.id === track.id && (!queueUid || queueUid === currentUid);
	const liked = favorites.includes(track.id);
	const onPlay = () => {
		if (queueUid) {
			if (queueUid === currentUid) togglePlay();
			else jumpToQueueItem(queueUid);
			return;
		}
		if (isCurrent) togglePlay();
		else playTrack(track, context);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-150", "hover:bg-surface-hover", isCurrent && "bg-accent-soft"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onPlay,
				className: "relative",
				"aria-label": `Play ${track.title}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverArt, {
					track,
					size: "md",
					showPlay: true,
					playing: isCurrent && isPlaying
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onPlay,
				className: "min-w-0 text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [typeof index === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden w-5 text-right text-xs text-fg-subtle tabular sm:inline",
						children: isCurrent && isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingBars, {}) : index + 1
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("truncate text-sm font-medium", isCurrent && "text-accent"),
							children: track.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-fg-muted",
							children: [track.artist, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-fg-subtle",
								children: [" · ", track.album]
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 hidden text-xs text-fg-subtle tabular sm:inline",
						children: formatTime(track.duration)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						className: cn("text-fg-muted", liked ? "text-accent opacity-100" : "opacity-0 group-hover:opacity-100 max-sm:opacity-100"),
						"aria-label": liked ? "Remove from favorites" : "Add to favorites",
						onClick: () => {
							toggleFavorite(track.id);
							toast(liked ? "Removed from favorites" : "Added to favorites");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", liked && "fill-current") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-fg-muted opacity-0 group-hover:opacity-100 max-sm:opacity-100",
							"aria-label": "Track actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: onPlay,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), " Play"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => {
									playNext(track);
									toast.success("Playing next", { description: track.title });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListStart, { className: "size-4" }), " Play next"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => {
									addToQueue(track);
									toast.success("Added to queue", { description: track.title });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { className: "size-4" }), " Add to queue"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => toggleFavorite(track.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", liked && "fill-current") }), liked ? "Remove from favorites" : "Add to favorites"]
							}),
							inQueue && queueUid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => removeFromQueue(queueUid),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Remove from queue"]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => {
									navigator.clipboard.writeText(track.filename);
									toast.success("Copied file name");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " Copy file name"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => {
									const loc = track.source === "catalog" ? `/music/${track.filename}` : track.filename;
									navigator.clipboard.writeText(loc);
									toast.message("File location", { description: loc });
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4" }), " Show file location"]
							})
						]
					})] })
				]
			})
		]
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("skeleton-shimmer rounded-md", className),
		...props
	});
}
function TrackList({ tracks, emptyTitle, emptyHint }) {
	const hydrated = usePlayerStore((s) => s.hydrated);
	const displayMode = usePlayerStore((s) => s.displayMode);
	const playTrack = usePlayerStore((s) => s.playTrack);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-2",
		children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-2 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-12 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/4" })]
			})]
		}, i))
	});
	if (!tracks.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListMusic, { className: "size-8 text-fg-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold",
				children: emptyTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-fg-muted",
				children: emptyHint
			})
		]
	});
	if (displayMode === "grid") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
		children: tracks.map((track) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => playTrack(track, tracks),
			className: "group rounded-xl bg-surface p-3 text-left transition-colors duration-150 hover:bg-surface-hover",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverArt, {
					track,
					className: "mb-3 aspect-square size-full rounded-lg",
					showPlay: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: track.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-fg-muted",
					children: track.artist
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-fg-subtle tabular",
					children: formatTime(track.duration)
				})
			]
		}, track.id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col"),
		children: tracks.map((track, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackRow, {
			track,
			context: tracks,
			index: i
		}, track.id))
	});
}
var TABS = [
	{
		id: "all",
		label: "All Tracks"
	},
	{
		id: "recent",
		label: "Recently Played"
	},
	{
		id: "favorites",
		label: "Favorites"
	},
	{
		id: "albums",
		label: "Albums"
	},
	{
		id: "artists",
		label: "Artists"
	}
];
function matchesQuery(track, q) {
	if (!q) return true;
	const s = q.toLowerCase();
	return track.title.toLowerCase().includes(s) || track.artist.toLowerCase().includes(s) || track.album.toLowerCase().includes(s) || track.filename.toLowerCase().includes(s);
}
function useVisibleTracks() {
	const tracks = usePlayerStore((s) => s.tracks);
	const search = usePlayerStore((s) => s.search);
	const view = usePlayerStore((s) => s.view);
	const libraryTab = usePlayerStore((s) => s.libraryTab);
	const favorites = usePlayerStore((s) => s.favorites);
	const recentlyPlayed = usePlayerStore((s) => s.recentlyPlayed);
	const selectedAlbum = usePlayerStore((s) => s.selectedAlbum);
	const selectedArtist = usePlayerStore((s) => s.selectedArtist);
	const filtered = tracks.filter((t) => matchesQuery(t, search));
	if (search.trim()) return filtered;
	if (view === "home") return filtered;
	if (selectedAlbum) return filtered.filter((t) => t.album === selectedAlbum);
	if (selectedArtist) return filtered.filter((t) => t.artist === selectedArtist);
	if (libraryTab === "favorites") return filtered.filter((t) => favorites.includes(t.id));
	if (libraryTab === "recent") {
		const map = new Map(filtered.map((t) => [t.id, t]));
		return recentlyPlayed.map((e) => map.get(e.id)).filter((t) => Boolean(t));
	}
	return filtered;
}
function LibraryHeader() {
	const view = usePlayerStore((s) => s.view);
	const libraryTab = usePlayerStore((s) => s.libraryTab);
	const setLibraryTab = usePlayerStore((s) => s.setLibraryTab);
	const selectedAlbum = usePlayerStore((s) => s.selectedAlbum);
	const selectedArtist = usePlayerStore((s) => s.selectedArtist);
	const setSelectedAlbum = usePlayerStore((s) => s.setSelectedAlbum);
	const setSelectedArtist = usePlayerStore((s) => s.setSelectedArtist);
	const search = usePlayerStore((s) => s.search);
	const tracks = useVisibleTracks();
	if (search.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "Search"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-fg-muted",
			children: [
				tracks.length,
				" result",
				tracks.length === 1 ? "" : "s",
				" for “",
				search,
				"”"
			]
		})]
	});
	if (view === "home") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-widest text-accent uppercase",
				children: "Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "All tracks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-fg-muted",
				children: [tracks.length, " files in your collection"]
			})
		]
	});
	if (selectedAlbum || selectedArtist) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				className: "mb-2 -ml-2",
				onClick: () => {
					setSelectedAlbum(null);
					setSelectedArtist(null);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: selectedAlbum || selectedArtist
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-fg-muted",
				children: [tracks.length, " tracks"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Library"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1",
			children: TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: libraryTab === tab.id ? "default" : "ghost",
				onClick: () => setLibraryTab(tab.id),
				className: cn("rounded-full", libraryTab === tab.id && "text-accent-fg"),
				children: tab.label
			}, tab.id))
		})]
	});
}
function AlbumGrid({ tracks }) {
	const setSelectedAlbum = usePlayerStore((s) => s.setSelectedAlbum);
	const albums = /* @__PURE__ */ new Map();
	for (const t of tracks) {
		const list = albums.get(t.album) ?? [];
		list.push(t);
		albums.set(t.album, list);
	}
	const entries = [...albums.entries()].sort((a, b) => a[0].localeCompare(b[0]));
	if (!entries.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackList, {
		tracks: [],
		emptyTitle: "No albums",
		emptyHint: "Import music to build your album shelf."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
		children: entries.map(([album, list]) => {
			const cover = list[0];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setSelectedAlbum(album),
				className: "rounded-xl bg-surface p-3 text-left transition-colors duration-150 hover:bg-surface-hover",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverArt, {
						track: cover,
						className: "mb-3 aspect-square size-full rounded-lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: album
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-fg-muted",
						children: [
							cover.artist,
							" · ",
							list.length,
							" tracks"
						]
					})
				]
			}, album);
		})
	});
}
function ArtistList({ tracks }) {
	const setSelectedArtist = usePlayerStore((s) => s.setSelectedArtist);
	const artists = /* @__PURE__ */ new Map();
	for (const t of tracks) {
		const list = artists.get(t.artist) ?? [];
		list.push(t);
		artists.set(t.artist, list);
	}
	const entries = [...artists.entries()].sort((a, b) => a[0].localeCompare(b[0]));
	if (!entries.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackList, {
		tracks: [],
		emptyTitle: "No artists",
		emptyHint: "Import music to see artists here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col",
		children: entries.map(([artist, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setSelectedArtist(artist),
			className: "flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-surface-hover",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverArt, {
				track: list[0],
				size: "md",
				className: "rounded-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: artist
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-fg-muted",
					children: [list.length, " tracks"]
				})]
			})]
		}, artist))
	});
}
function MainLibrary() {
	const view = usePlayerStore((s) => s.view);
	const libraryTab = usePlayerStore((s) => s.libraryTab);
	const search = usePlayerStore((s) => s.search);
	const selectedAlbum = usePlayerStore((s) => s.selectedAlbum);
	const selectedArtist = usePlayerStore((s) => s.selectedArtist);
	const tracks = useVisibleTracks();
	const searching = Boolean(search.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryHeader, {}), !searching && view === "library" && libraryTab === "albums" && !selectedAlbum && !selectedArtist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumGrid, { tracks }) : !searching && view === "library" && libraryTab === "artists" && !selectedAlbum && !selectedArtist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistList, { tracks }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackList, {
		tracks,
		emptyTitle: searching ? "No matching tracks" : libraryTab === "favorites" ? "No favorites yet" : libraryTab === "recent" ? "Nothing played yet" : "Library is empty",
		emptyHint: searching ? "Try a different title, artist, album, or file name." : libraryTab === "favorites" ? "Tap the heart on a track to save it here." : libraryTab === "recent" ? "Play something and it will show up in this list." : "Drop audio files onto the page or import a folder in Settings."
	})] });
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg", "placeholder:text-fg-subtle", "transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex size-8 items-center justify-center rounded-md bg-accent text-accent-fg", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "size-4",
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "10",
					width: "3",
					height: "10",
					rx: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "9",
					y: "4",
					width: "3",
					height: "16",
					rx: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "15",
					y: "7",
					width: "3",
					height: "13",
					rx: "1"
				})
			]
		})
	});
}
function Navbar({ onOpenSettings }) {
	const view = usePlayerStore((s) => s.view);
	const setView = usePlayerStore((s) => s.setView);
	const queueOpen = usePlayerStore((s) => s.queueOpen);
	const setQueueOpen = usePlayerStore((s) => s.setQueueOpen);
	const search = usePlayerStore((s) => s.search);
	const setSearch = usePlayerStore((s) => s.setSearch);
	const displayMode = usePlayerStore((s) => s.displayMode);
	const setDisplayMode = usePlayerStore((s) => s.setDisplayMode);
	const navBtn = (id, label, icon) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "sm",
		onClick: () => setView(id),
		className: cn("h-9 gap-2 px-3", view === id && "bg-surface-hover text-fg"),
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: label
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-14 items-center gap-2 px-3 sm:px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-2 pr-2",
					onClick: () => setView("home"),
					"aria-label": "Ember home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base font-bold tracking-tight",
						children: "EMBER"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-0.5",
					children: [
						navBtn("home", "Home", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4" })),
						navBtn("library", "Library", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListMusic, { className: "size-4" })),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setQueueOpen(!queueOpen),
							className: cn("h-9 gap-2 px-3", queueOpen && "bg-surface-hover text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Queue"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-1 min-w-0 flex-1 sm:mx-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search title, artist, album…",
						className: "h-9 border-transparent bg-surface pl-9",
						"aria-label": "Search tracks"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": displayMode === "list" ? "Grid view" : "List view",
					onClick: () => setDisplayMode(displayMode === "list" ? "grid" : "list"),
					className: "hidden sm:inline-flex",
					children: displayMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Settings",
					onClick: onOpenSettings,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
				})
			]
		})
	});
}
function Visualizer({ active, className }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let raf = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const data = /* @__PURE__ */ new Uint8Array(128);
		const loop = () => {
			const analyser = engine.getAnalyser();
			const parent = canvas.parentElement;
			if (!parent) return;
			const w = parent.clientWidth;
			const h = parent.clientHeight;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			if (analyser && active) analyser.getByteFrequencyData(data);
			const bars = 32;
			const gap = 3;
			const barW = (w - 93) / bars;
			for (let i = 0; i < bars; i++) {
				const v = active ? (data[i + 2] ?? 0) / 255 : .08;
				const bh = Math.max(4, v * h);
				ctx.fillStyle = i < bars * .35 ? "#e85d2c" : "rgba(244,239,232,0.28)";
				ctx.fillRect(i * (barW + gap), h - bh, barW, bh);
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-16 w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block size-full"
		})
	});
}
function Waveform({ peaks, progress, onSeek, className }) {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const hoverRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const draw = () => {
			const w = wrap.clientWidth;
			const h = wrap.clientHeight;
			if (w <= 0 || h <= 0) return;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const n = Math.max(peaks.length, 1);
			const gap = 1;
			const barW = Math.max(1.5, (w - gap * (n - 1)) / n);
			const hover = hoverRef.current;
			for (let i = 0; i < n; i++) {
				const bh = Math.max(.08, peaks[i] ?? .2) * h;
				const x = i * (barW + gap);
				const y = (h - bh) / 2;
				const ratio = i / n;
				const played = ratio <= progress;
				if (hover != null && ratio <= hover && !played) ctx.fillStyle = "rgba(232, 93, 44, 0.55)";
				else if (played) ctx.fillStyle = "#e85d2c";
				else ctx.fillStyle = "rgba(163, 154, 144, 0.38)";
				ctx.fillRect(x, y, barW, bh);
			}
		};
		draw();
		const ro = new ResizeObserver(draw);
		ro.observe(wrap);
		return () => ro.disconnect();
	}, [peaks, progress]);
	const ratioFromEvent = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapRef,
		className: cn("relative h-12 w-full cursor-pointer", className),
		onPointerDown: (e) => onSeek?.(ratioFromEvent(e)),
		onPointerMove: (e) => {
			hoverRef.current = ratioFromEvent(e);
			const canvas = canvasRef.current;
			const wrap = wrapRef.current;
			if (!canvas || !wrap) return;
			canvas.dispatchEvent(new Event("redraw"));
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = wrap.clientWidth;
			const h = wrap.clientHeight;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const n = Math.max(peaks.length, 1);
			const gap = 1;
			const barW = Math.max(1.5, (w - gap * (n - 1)) / n);
			const hover = hoverRef.current;
			for (let i = 0; i < n; i++) {
				const bh = Math.max(.08, peaks[i] ?? .2) * h;
				const x = i * (barW + gap);
				const y = (h - bh) / 2;
				const ratio = i / n;
				const played = ratio <= progress;
				if (hover != null && ratio <= hover && !played) ctx.fillStyle = "rgba(232, 93, 44, 0.55)";
				else if (played) ctx.fillStyle = "#e85d2c";
				else ctx.fillStyle = "rgba(163, 154, 144, 0.38)";
				ctx.fillRect(x, y, barW, bh);
			}
		},
		onPointerLeave: () => {
			hoverRef.current = null;
		},
		role: "slider",
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": Math.round(progress * 100),
		"aria-label": "Seek",
		tabIndex: 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block size-full"
		})
	});
}
function NowPlayingHero() {
	const track = usePlayerStore(selectCurrentTrack);
	const isPlaying = usePlayerStore((s) => s.isPlaying);
	const currentTime = usePlayerStore((s) => s.currentTime);
	const duration = usePlayerStore((s) => s.duration);
	const favorites = usePlayerStore((s) => s.favorites);
	const togglePlay = usePlayerStore((s) => s.togglePlay);
	const seek = usePlayerStore((s) => s.seek);
	const addToQueue = usePlayerStore((s) => s.addToQueue);
	const toggleFavorite = usePlayerStore((s) => s.toggleFavorite);
	const playTrack = usePlayerStore((s) => s.playTrack);
	const visible = useVisibleTracks();
	if (usePlayerStore((s) => s.search).trim()) return null;
	const featured = track ?? visible[0];
	if (!featured) return null;
	const liked = favorites.includes(featured.id);
	const dur = track && (duration || track.duration) || featured.duration;
	const progress = track && dur > 0 ? currentTime / dur : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8 grid gap-6 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverArt, {
			track: featured,
			size: "xl",
			className: "mx-auto size-48 rounded-xl sm:mx-0 sm:size-56"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col justify-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-accent uppercase",
					children: track ? "Now playing" : "Up next"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: featured.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-fg-muted",
					children: [featured.artist, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-fg-subtle",
						children: [
							" ",
							"· ",
							featured.album,
							featured.year ? ` · ${featured.year}` : "",
							" · ",
							formatTime(featured.duration)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								if (track) togglePlay();
								else playTrack(featured, visible);
							},
							className: "rounded-full px-5",
							children: [track && isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), track && isPlaying ? "Pause" : "Play"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: () => {
								addToQueue(featured);
								toast.success("Added to queue", { description: featured.title });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { className: "size-4" }), " Queue"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => toggleFavorite(featured.id),
							"aria-label": "Favorite",
							className: liked ? "text-accent" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 ${liked ? "fill-current" : ""}` })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
					peaks: featured.peaks,
					progress: track ? progress : 0,
					onSeek: track ? (r) => seek(r * dur) : void 0,
					className: "mt-5 h-14"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visualizer, {
					active: Boolean(track && isPlaying),
					className: "mt-2 h-12"
				})
			]
		})]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-surface-hover",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-3 rounded-full bg-fg shadow-sm ring-offset-bg transition-[transform,box-shadow] duration-150 hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:outline-none" })]
}));
Slider.displayName = Slider$1.displayName;
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger$1;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	sideOffset,
	className: cn("z-toast rounded-md border border-border bg-surface-elevated px-2 py-1 text-xs text-fg shadow-panel", "origin-(--radix-tooltip-content-transform-origin)", "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out", className),
	...props
}) }));
TooltipContent.displayName = Content2$1.displayName;
function Tip({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: label })] });
}
function PlayerBar() {
	const track = usePlayerStore(selectCurrentTrack);
	const isPlaying = usePlayerStore((s) => s.isPlaying);
	const currentTime = usePlayerStore((s) => s.currentTime);
	const duration = usePlayerStore((s) => s.duration);
	const volume = usePlayerStore((s) => s.volume);
	const muted = usePlayerStore((s) => s.muted);
	const shuffle = usePlayerStore((s) => s.shuffle);
	const repeat = usePlayerStore((s) => s.repeat);
	const togglePlay = usePlayerStore((s) => s.togglePlay);
	const next = usePlayerStore((s) => s.next);
	const prev = usePlayerStore((s) => s.prev);
	const seek = usePlayerStore((s) => s.seek);
	const setVolume = usePlayerStore((s) => s.setVolume);
	const toggleMute = usePlayerStore((s) => s.toggleMute);
	const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
	const cycleRepeat = usePlayerStore((s) => s.cycleRepeat);
	const dur = duration || track?.duration || 0;
	const progress = dur > 0 ? currentTime / dur : 0;
	const peaks = track?.peaks?.length ? track.peaks : hashPeaks(track?.id || "empty");
	const RepeatIcon = repeat === "one" ? Repeat1 : Repeat;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 items-center gap-2 px-3 py-2 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1fr)] sm:px-4 sm:py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [
						track ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverArt, {
							track,
							size: "md",
							className: "size-12 rounded-md sm:size-14"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-12 rounded-md bg-surface-elevated sm:size-14" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: track?.title ?? "Nothing playing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-fg-muted",
								children: track?.artist ?? "Choose a track"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 sm:hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: toggleShuffle,
									"aria-label": "Shuffle",
									className: cn(shuffle && "text-accent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: prev,
									"aria-label": "Previous",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "size-4 fill-current" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									className: "size-10 rounded-full",
									onClick: togglePlay,
									"aria-label": isPlaying ? "Pause" : "Play",
									children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: next,
									"aria-label": "Next",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-4 fill-current" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: cycleRepeat,
									"aria-label": "Repeat",
									className: cn(repeat !== "off" && "text-accent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepeatIcon, { className: "size-4" })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center justify-center gap-1 sm:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: "Shuffle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: toggleShuffle,
									"aria-label": "Shuffle",
									className: cn(shuffle && "text-accent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: "Previous",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: prev,
									"aria-label": "Previous",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "size-4 fill-current" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								className: "size-11 rounded-full",
								onClick: togglePlay,
								"aria-label": isPlaying ? "Pause" : "Play",
								children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 fill-current" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: "Next",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: next,
									"aria-label": "Next",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-4 fill-current" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
								label: repeat === "off" ? "Repeat off" : repeat === "queue" ? "Repeat queue" : "Repeat track",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: cycleRepeat,
									"aria-label": "Repeat",
									className: cn(repeat !== "off" && "text-accent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepeatIcon, { className: "size-4" })
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right text-xs text-fg-subtle tabular",
								children: formatTime(currentTime)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
								peaks,
								progress,
								onSeek: (r) => seek(r * dur),
								className: "h-8 flex-1 sm:h-10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-xs text-fg-subtle tabular",
								children: formatTime(dur)
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center justify-end gap-2 sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: toggleMute,
						"aria-label": muted ? "Unmute" : "Mute",
						children: muted || volume === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						value: [muted ? 0 : volume],
						min: 0,
						max: 1,
						step: .01,
						onValueChange: (v) => setVolume(v[0] ?? 0),
						className: "w-28",
						"aria-label": "Volume"
					})]
				})
			]
		})
	});
}
function PlayerSync() {
	const hydrate = usePlayerStore((s) => s.hydrate);
	const setTime = usePlayerStore((s) => s.setTime);
	const handleEnded = usePlayerStore((s) => s.handleEnded);
	const handleError = usePlayerStore((s) => s.handleError);
	const persist = usePlayerStore((s) => s.persist);
	const isPlaying = usePlayerStore((s) => s.isPlaying);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => engine.onTime(setTime), [setTime]);
	(0, import_react.useEffect)(() => engine.onEnded(handleEnded), [handleEnded]);
	(0, import_react.useEffect)(() => engine.onError((message) => {
		toast.error("Could not play this file", { description: message });
		handleError(message);
	}), [handleError]);
	(0, import_react.useEffect)(() => {
		if (!isPlaying) return;
		const id = window.setInterval(() => persist(), 4e3);
		return () => window.clearInterval(id);
	}, [isPlaying, persist]);
	(0, import_react.useEffect)(() => {
		const onHide = () => persist();
		window.addEventListener("pagehide", onHide);
		document.addEventListener("visibilitychange", onHide);
		return () => {
			window.removeEventListener("pagehide", onHide);
			document.removeEventListener("visibilitychange", onHide);
		};
	}, [persist]);
	return null;
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
		orientation: "vertical",
		className: "flex w-2 touch-none p-px transition-colors",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "relative flex-1 rounded-full bg-border-strong" })
	})]
}));
ScrollArea.displayName = Root.displayName;
function SortableItem({ id, children }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition
		},
		className: cn("flex items-center gap-1", isDragging && "z-10 opacity-80"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "touch-none p-1 text-fg-subtle hover:text-fg",
			"aria-label": "Reorder",
			...attributes,
			...listeners,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children
		})]
	});
}
function QueuePanel() {
	const queue = usePlayerStore((s) => s.queue);
	const tracks = usePlayerStore((s) => s.tracks);
	const currentUid = usePlayerStore((s) => s.currentUid);
	const jumpToQueueItem = usePlayerStore((s) => s.jumpToQueueItem);
	const moveQueueItem = usePlayerStore((s) => s.moveQueueItem);
	const clearQueue = usePlayerStore((s) => s.clearQueue);
	const setQueueOpen = usePlayerStore((s) => s.setQueueOpen);
	const queueOpen = usePlayerStore((s) => s.queueOpen);
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const onDragEnd = (event) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const from = queue.findIndex((q) => q.uid === active.id);
		const to = queue.findIndex((q) => q.uid === over.id);
		if (from >= 0 && to >= 0) moveQueueItem(from, to);
	};
	const items = queue.map((item) => {
		const track = tracks.find((t) => t.id === item.trackId);
		return track ? {
			item,
			track
		} : null;
	}).filter((x) => x !== null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("flex h-full w-full flex-col border-l border-border bg-surface", "max-lg:fixed max-lg:top-14 max-lg:right-0 max-lg:bottom-0 max-lg:z-50 max-lg:w-full max-lg:max-w-sm max-lg:shadow-panel", "max-lg:transition-transform max-lg:duration-300 max-lg:ease-[cubic-bezier(0.22,1,0.36,1)]", queueOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full", !queueOpen && "lg:hidden"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-14 items-center justify-between border-b border-border px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-semibold",
				children: "Queue"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-fg-muted",
				children: [queue.length, " tracks"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: clearQueue,
					disabled: !queue.length,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Clear"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					className: "lg:hidden",
					onClick: () => setQueueOpen(false),
					"aria-label": "Close queue",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display font-semibold",
				children: "Queue is empty"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg-muted",
				children: "Add tracks from your library. You can drop the same track more than once."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2 pb-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
					sensors,
					collisionDetection: closestCenter,
					onDragEnd,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
						items: queue.map((q) => q.uid),
						strategy: verticalListSortingStrategy,
						children: items.map(({ item, track }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableItem, {
							id: item.uid,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								role: "button",
								tabIndex: 0,
								onDoubleClick: () => jumpToQueueItem(item.uid),
								onKeyDown: (e) => {
									if (e.key === "Enter") jumpToQueueItem(item.uid);
								},
								className: cn(item.uid === currentUid && "rounded-lg"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackRow, {
									track,
									context: items.map((x) => x.track),
									inQueue: true,
									queueUid: item.uid
								})
							})
						}, item.uid))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 pt-2 text-xs text-fg-subtle",
					children: "Drag to reorder. Double-click to play."
				})]
			})
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-modal bg-bg/80 data-[state=open]:opacity-100", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-modal w-full max-w-md -translate-x-1/2 -translate-y-1/2", "rounded-xl border border-border bg-surface p-6 text-fg shadow-panel", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-4 right-4 rounded-md p-1 text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 flex flex-col gap-1", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-semibold tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-fg-muted", className),
		...props
	});
}
var SHORTCUTS = [
	["Space", "Play / Pause"],
	["←", "Previous track"],
	["→", "Next track"],
	["↑", "Volume up"],
	["↓", "Volume down"],
	["M", "Mute"],
	["S", "Shuffle"],
	["R", "Cycle repeat"]
];
function SettingsDialog({ open, onOpenChange }) {
	const fileRef = (0, import_react.useRef)(null);
	const dirRef = (0, import_react.useRef)(null);
	const addTracks = usePlayerStore((s) => s.addTracks);
	const clearImported = usePlayerStore((s) => s.clearImported);
	const tracks = usePlayerStore((s) => s.tracks);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		dirRef.current?.setAttribute("webkitdirectory", "");
		dirRef.current?.setAttribute("directory", "");
	}, []);
	const ingest = async (files) => {
		if (!files.length) {
			toast.message("No audio files found");
			return;
		}
		setBusy(true);
		try {
			const result = await importAudioFiles(files);
			if (result.tracks.length) {
				addTracks(result.tracks);
				toast.success(`Added ${result.tracks.length} track${result.tracks.length === 1 ? "" : "s"}`);
			}
			for (const err of result.errors) toast.error(err.name, { description: err.message });
		} finally {
			setBusy(false);
		}
	};
	const pickFolder = async () => {
		const picker = window.showDirectoryPicker;
		if (picker) try {
			const files = await filesFromDirectoryHandle(await picker());
			await ingest(files);
			return;
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return;
		}
		dirRef.current?.click();
	};
	const imported = tracks.filter((t) => t.source === "import").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Ember plays files from this session’s library. Drop files onto the page or import a folder from your computer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-medium tracking-wide text-fg-muted uppercase",
					children: "Library"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 text-sm text-fg-muted",
					children: [
						tracks.length,
						" tracks · ",
						imported,
						" imported"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: busy,
							onClick: () => fileRef.current?.click(),
							children: "Import files"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							disabled: busy,
							onClick: () => void pickFolder(),
							children: "Import folder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: !imported || busy,
							onClick: () => {
								clearImported();
								toast.message("Imported tracks cleared");
							},
							children: "Clear imported"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "audio/*,.mp3,.wav,.flac,.ogg,.m4a,.aac",
					multiple: true,
					className: "hidden",
					onChange: (e) => {
						const files = [...e.target.files ?? []];
						e.target.value = "";
						ingest(files);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: dirRef,
					type: "file",
					multiple: true,
					className: "hidden",
					onChange: (e) => {
						const files = [...e.target.files ?? []];
						e.target.value = "";
						ingest(files);
					}
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium tracking-wide text-fg-muted uppercase",
				children: "Keyboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border rounded-lg border border-border",
				children: SHORTCUTS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg-muted",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono text-xs",
						children: key
					})]
				}, key))
			})] })]
		})] })
	});
}
function AppShell() {
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const view = usePlayerStore((s) => s.view);
	const queueOpen = usePlayerStore((s) => s.queueOpen);
	const setQueueOpen = usePlayerStore((s) => s.setQueueOpen);
	const search = usePlayerStore((s) => s.search);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 250,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyboardShortcuts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				offset: {
					bottom: 108,
					right: 16
				},
				toastOptions: { className: "border-border bg-surface-elevated text-fg shadow-panel font-sans" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-dvh flex-col bg-bg text-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { onOpenSettings: () => setSettingsOpen(true) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: cn("min-w-0 flex-1 overflow-y-auto px-4 pt-6 pb-32 sm:px-8", queueOpen && "lg:mr-80"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-5xl",
								children: [view === "home" && !search.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowPlayingHero, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainLibrary, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed top-14 right-0 bottom-0 w-80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueuePanel, {})
							})
						})]
					}),
					queueOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "fixed inset-0 z-40 bg-bg/50 lg:hidden",
						"aria-label": "Close queue",
						onClick: () => setQueueOpen(false)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueuePanel, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerBar, {})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
