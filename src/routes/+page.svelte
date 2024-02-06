<script lang="ts">
	import { label as labelCva } from "$lib/styles/label"
	import { input as inputCva } from "$lib/styles/input"
	import type { Snapshot } from "./$types"
	import { undent } from "@bscotch/utility"
	import { button } from "$lib/styles/button"
	import { Trash } from "lucide-svelte"
	import { db, deletePreset, addPreset, Preset, savePreset } from "$lib/db"
	import { liveQuery } from "dexie"

	const presets = liveQuery(() => db.presets.toArray())

	let loadedPreset: Preset = new Preset()

	const slottingProcedureLink =
		"https://docs.google.com/document/d/1plnB-bdQyCgJN3mpa2JLUgkXgbrT6E9Rq3qXd0E05ME/edit?usp=sharing"
	const slottingChannelID = "985764020625748078"

	export const snapshot: Snapshot<Preset> = {
		capture: () => loadedPreset,
		restore: (value) => (loadedPreset = value),
	}

	$: opTimeEpoch = Math.floor(new Date(loadedPreset.opTime).getTime() / 1000).toString()

	$: slotTimeEpoch = Math.floor(new Date(loadedPreset.slotTime).getTime() / 1000).toString()

	$: formatted = undent`
<@&882302575439925269>
# Operation: ${loadedPreset.title}
Op time: <t:${opTimeEpoch}:R>, <t:${opTimeEpoch}:F>
Op type: ${loadedPreset.type}
Life count: ${loadedPreset.lives}

Estimated time: ${loadedPreset.estimatedTime}

Modset attached.

## Description
${loadedPreset.desc}

## Notes
${loadedPreset.notes}

### Roster
[Roster](${loadedPreset.roster})
[Slotting procedure for those who are new](${slottingProcedureLink})

Slotting will open at <t:${slotTimeEpoch}:R>, <t:${slotTimeEpoch}:F> in <#${slottingChannelID}>
`
</script>

<div class="flex flex-row min-h-screen">
	<div class="flex flex-col border-r border-base3 space-y-1 pt-1">
		{#if $presets}
			{#each $presets as preset}
				<div class="text-accent-fg flex items-center justify-between mx-1">
					<button
						class="{loadedPreset.id == preset.id
							? 'bg-base5'
							: 'bg-base2'} px-4 h-10 flex items-center flex-grow"
						on:click={() => {
							loadedPreset = preset
						}}>
						{preset.title}
					</button>

					<button
						class="bg-red4 hover:bg-red9 h-10 w-10 flex items-center justify-center"
						on:click={() => {
							deletePreset(preset.id ?? 0)
						}}>
						<Trash class="size-5"></Trash>
					</button>
				</div>
			{/each}
		{/if}
	</div>
	<div class="flex flex-col flex-grow">
		<div>
			<div class="content">
				<div class="flex flex-col gap-1">
					<pre>{JSON.stringify(loadedPreset.id, null, 2)}</pre>
					<div class="flex flex-row gap-2 w-full">
						<label class="{labelCva()} flex-grow">
							Title
							<input bind:value={loadedPreset.title} type="text" class={inputCva()} />
						</label>
						<label class="{labelCva()} flex-grow">
							Type
							<input bind:value={loadedPreset.type} type="text" class={inputCva()} />
						</label>
					</div>

					<div class="flex grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
						<label class="{labelCva()} flex-grow">
							Operation time
							<input
								bind:value={loadedPreset.opTime}
								type="datetime-local"
								class={inputCva()} />
						</label>
						<label class="{labelCva()} flex-grow">
							Slotting time
							<input
								bind:value={loadedPreset.slotTime}
								type="datetime-local"
								class={inputCva()} />
						</label>
					</div>

					<div class="flex flex-row gap-2 w-full">
						<label class="{labelCva()} flex-grow">
							Life count
							<input bind:value={loadedPreset.lives} type="text" class={inputCva()} />
						</label>
						<label class="{labelCva()} flex-grow">
							Estimated time
							<input
								bind:value={loadedPreset.estimatedTime}
								type="text"
								class={inputCva()} />
						</label>
					</div>

					<label class="{labelCva()} flex-grow">
						Roster Link
						<input bind:value={loadedPreset.roster} type="text" class={inputCva()} />
					</label>

					<label class="{labelCva()} flex-grow">
						Description
						<textarea
							bind:value={loadedPreset.desc}
							class="{inputCva()} min-h-32 py-2" />
					</label>

					<label class="{labelCva()} flex-grow">
						Notes
						<textarea
							bind:value={loadedPreset.notes}
							class="{inputCva()} min-h-32 py-2" />
					</label>
				</div>

				<hr class="my-2 border-base3" />

				<div class="flex flex-row gap-2">
					<button
						class={button()}
						on:click={() => {
							console.log(formatted)
							navigator.clipboard.writeText(formatted)
						}}>
						copy to clipboard
					</button>

					<button
						class={button()}
						on:click={() => {
							savePreset(loadedPreset)
						}}>
						overwrite preset
					</button>

					<button
						class={button()}
						on:click={async () => {
							try {
								loadedPreset = await addPreset(loadedPreset)
							} catch (e) {
								console.error(e)
							}
						}}>
						save new preset
					</button>
				</div>

				<pre
					class="mt-5 px-4 py-3 bg-base2 border border-base4 max-w-full">{formatted}</pre>
			</div>
		</div>
	</div>
</div>

<style>
	pre {
		white-space: pre-wrap; /* Since CSS 2.1 */
		white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
		white-space: -pre-wrap; /* Opera 4-6 */
		white-space: -o-pre-wrap; /* Opera 7 */
		word-wrap: break-word; /* Internet Explorer 5.5+ */
	}
</style>
