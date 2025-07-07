import React, { forwardRef, ImgHTMLAttributes } from "react";

import { useImage } from "./useImage";

function getInt(x: string | number) {
	if (typeof x === "number") {
		return x;
	}
	if (typeof x === "string") {
		const parsed = parseInt(x, 10);
		return isNaN(parsed) ? undefined : parsed;
	}
	return undefined;
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	placeholderSrc?: string;
	placeholder?: React.ReactElement;
	placeholderColor?: string;
	ignorePlaceholder?: boolean;
	src?: string;
	height: number | string;
	width: number | string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
	const {
		placeholderSrc,
		placeholder,
		placeholderColor = "gray",
		ignorePlaceholder = false,
		onLoad,
		onError,

		src,
		loading,
		crossOrigin,
		height,
		width,
		...rest
	} = props;

	const intWidth = getInt(width);
	const intHeight = getInt(height);

	const shared = { ref, width: intWidth, height: intHeight, ...rest };

	const { isLoaded } = useImage({
		...props,
		ignorePlaceholder: !!loading || ignorePlaceholder,
	});

	// Rendering logic depending on loading state
	if (!isLoaded) {
		if (placeholderSrc) return <img src={placeholderSrc} alt={shared.alt} {...shared} />;

		if (placeholder) return placeholder;

		const { style = {} } = shared;
		return (
			<div
				{...shared}
				style={{
					height: `${intHeight}px`,
					width: `${intWidth}px`,
					background: placeholderColor,
					...style,
				}}
			/>
		);
	}

	return <img src={src} loading={loading} crossOrigin={crossOrigin} onLoad={onLoad} onError={onError} alt={shared.alt} {...shared} />;
});

Image.displayName = "Image";

export default Image;