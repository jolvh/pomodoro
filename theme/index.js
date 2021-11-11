import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `DM Sans, ${base.fonts?.heading}`,
        body: `DM Sans, ${base.fonts?.body}`,
    },
    colors: {
        brand: {
            white: "#ffffff",
            black: "#111111",
            lightGray: "#555555",
            green: "#5EC96F",
            red: "#E35058"
        }
    },
    components: {
        Heading: {
            baseStyle: {
                color: "brand.black",
                fontWeight: "500"
            },
            sizes: {
                base: {
                    fontSize: "2.5rem"
                },
                sm: {
                    fontSize: "3rem"
                },
                md: {
                    fontSize: "4rem"
                }
            },
            variants: {
                timer: {
                    fontWeight: "700",
                }
            }
        },
        Text: {
            baseStyle: {
                color: "brand.lightGray"
            },
            sizes: {
                base: {
                    fontSize: "1rem"
                },
                md: {
                    fontSize: "1.5rem"
                }
            }
        },
        Button: {
            baseStyle: {
                fontWeight: "700"
            },
            sizes: {
                small: {
                    fontSize: "1rem",
                    w: "6rem",
                    h: "full"
                },
                large: {
                    fontSize: "1.5rem",
                    w: "8rem",
                    h: "full"
                }
            },
            variants: {
                toggle: {
                    bg: "brand.green",
                    color: "brand.white",
                }
            }
        }
    }
})

export default theme;