import { extendTheme, theme as base } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                overflow: "hidden"
            }
        }
    },
    fonts: {
        heading: `DM Sans, ${base.fonts?.heading}`,
        body: `DM Sans, ${base.fonts?.body}`,
    },
    colors: {
        brand: {
            white: "#ffffff",
            offWhite: "#F5F5EB",
            black: "#111111",
            lightGray: "#555555",
            green: "#62DA9F",
            red: "#E35058",
            peachy: "#FFB56C",
            link: "#0044CC"
        }
    },
    components: {
        Heading: {
            baseStyle: (props) => ({
                color: mode("brand.black", "brand.offWhite")(props),
                fontWeight: "500"
            }),
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
            baseStyle: (props) => ({
                color: mode("brand.lightGray", "brand.offWhite")(props)
            }),
            sizes: {
                base: {
                    fontSize: "0.75rem"
                },
                md: {
                    fontSize: "1rem"
                }
            }
        },
        Button: {
            baseStyle: {
                fontWeight: "700",
                _focus: {
                    ring: "none"
                },
                _focusVisible: {
                    ring: "3",
                    ringColor: "brand.link"
                }
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
                    color: "brand.white"
                }
            }
        }
    }
})

export default theme;