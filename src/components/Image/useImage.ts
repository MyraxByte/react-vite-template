import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type ImageOptions = {
    src?: string;
    srcSet?: string;
    sizes?: string;
    crossOrigin?: string;
    ignorePlaceholder?: boolean;
};

export function useImage(props?: ImageOptions) {
	const [status, setStatus] = useState("idle");

	const isError = status === "failed";
	const isLoading = status === "loading";
	const isIdle = status === "idle";
	const isLoaded = status === "loaded";

	useEffect(() => {
		if (props?.ignorePlaceholder) {
			return setStatus("loaded");
		}

		setStatus(props?.src ? "loading" : "idle");
	}, [props?.ignorePlaceholder, props?.src]);

	const imageRef = useRef<any>(null);

	const flush = () => {
		if (imageRef.current) {
			imageRef.current = null;
		}
	};

	const load = useCallback(() => {
		if (!props?.src) return;

		flush();

		const img = new window.Image();

		img.src = props?.src;

		if (props?.crossOrigin) {
			img.crossOrigin = props?.crossOrigin;
		}

		if (props?.srcSet) {
			img.srcset = props?.srcSet;
		}

		if (props?.sizes) {
			img.sizes = props?.sizes;
		}

		img.onload = () => {
			flush();
			setStatus("loaded");
		};

		img.onerror = () => {
			flush();
			setStatus("failed");
		};

		imageRef.current = img;
	}, [props?.src, props?.crossOrigin, props?.srcSet, props?.sizes]);

	// we want this effect to run synchronously before UI gets painted as we are working with dom api
	useLayoutEffect(() => {
		if (props?.ignorePlaceholder) return;

		if (status === "loading") {
			load();
		}

		return flush;
	}, [status, load, props?.ignorePlaceholder]);

	return {
		status,
		isError,
		isIdle,
		isLoading,
		isLoaded,
	};
}
