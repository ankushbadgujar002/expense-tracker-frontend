export const getSwalTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    return {
        background: isDark ? "#1f2937" : "#ffffff",
        color: isDark ? "#f9fafb" : "#111827"
    };
};