export function formatDateTime(date: string | null | undefined): string {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
    const seconds = String(parsedDate.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function isEmpty(value) {
    return value == null || value.trim() === "";
}

export function getFieldError(value) {
    return isEmpty(value);
}

export function getFieldHelperText(value, fieldName) {
    return getFieldError(value)
        ? `${fieldName} is required`
        : "";
}

export function isEmpty2(setter, value) {
    if (isEmpty(value)) {
        setter(false);
    }
    else {
        setter(true);
    }
}

export function DownloadFile(base64Data) {
    const binaryString = window.atob(base64Data);

    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Create Excel Blob
    const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    // Download file
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Report.xlsx";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
