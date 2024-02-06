import Dexie, { type Table } from "dexie"

export class Preset {
	id?: number

	title: string = "Untitled Operation"
	opTime: Date = new Date()
	slotTime: Date = new Date()
	type: string = ""
	lives: string = ""
	estimatedTime: string = "~90 minutes"
	desc: string = ""
	notes: string = ""
	roster: string = ""
}

export class MySubClassedDexie extends Dexie {
	presets!: Table<Preset>

	constructor() {
		super("myDatabase")
		this.version(1).stores({
			presets: "++id, title", // Primary key and indexed props
		})
	}
}

export async function savePreset(preset: Preset) {
	return db.presets.update(preset.id, preset)
}

export async function addPreset(preset: Preset) {
	preset.id = undefined
	preset.id = await db.presets.add(preset)
	return preset
}

export async function deletePreset(id: number) {
	return db.presets.delete(id)
}

export const db = new MySubClassedDexie()

db.presets.mapToClass(Preset)
