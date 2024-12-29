export const safeNumber = (value: FormDataEntryValue | null) => {
	if (value) {
		return Number(value);
	}
};

export const safeString = (value: FormDataEntryValue | null) => {
	if (value) {
		return value;
	}
};
