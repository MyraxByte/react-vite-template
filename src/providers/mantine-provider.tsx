import type { PropsWithChildren } from "react";
import type { MantineProviderProps } from "@mantine/core";
import { createTheme, MantineProvider as MantineLibProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Toaster } from "sonner";

const theme = createTheme({
	fontFamily: "Inter, sans-serif",
	headings: {
		fontFamily: "Inter, sans-serif",
	},
	primaryColor: "blue",
	primaryShade: 5,
});

const ProviderOptions: MantineProviderProps = {
	theme,
	defaultColorScheme: "dark",
	withCssVariables: true,
};

export default function MantineProvider({ children }: PropsWithChildren) {
	return (
		<MantineLibProvider {...ProviderOptions}>
			<DatesProvider settings={{ consistentWeeks: true }}>{children}</DatesProvider>
			<Toaster
				position="bottom-center"
				duration={3000}
				visibleToasts={3}
				richColors
				theme="dark"
				gap={8}
			/>
		</MantineLibProvider>
	);
}
