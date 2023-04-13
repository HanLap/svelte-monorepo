<script>
	export let data;

	$: ({ maschine } = data);
</script>

<div class="">
	<div class="h-28 flex flex-col bg-base-300 p-1">
		<div class="flex justify-between">
			<div class="breadcrumbs text-xs">
				<ul>
					<li>stammdaten</li>
					<li>maschinen</li>
					<li>{maschine.id}</li>
				</ul>
			</div>
			<a href=".." class="btn btn-ghost btn-sm">X</a>
		</div>
		<div class="flex justify-between my-5">
			<h1 class="text-xl font-semibold">
				{maschine.name}
			</h1>
			<div>
				<a href="./edit" class="btn btn-xs btn-primary">editieren</a>
				<form method="post" action="?/delete" class="inline">
					<button class="btn btn-xs btn-error" type="submit">löschen</button>
				</form>
			</div>
		</div>
	</div>
</div>
