class Person {
	public firstName: string;
	public lastName: string;

	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	message(): string {
		return `Hello ${this.fullName()}`;
	}

	private fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}

export default Person;