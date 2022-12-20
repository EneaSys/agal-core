import { FormControl } from "@angular/forms";

export class AgalValidator {

	static haveId(c: FormControl) {
		if (c.value == null || c.value == "" || c.value.id == null) {
			return {
				validatorHaveId: {
					valid: false
				}
			};
		}
		return null; // funziona
	}

}