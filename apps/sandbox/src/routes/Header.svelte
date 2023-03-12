<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { User } from '@prisma/client';
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';

	$: current = (path: string) => $page.url.pathname === path;

	$: session  = $page.data.session as unknown as { user: User} | undefined;
</script>

<Navbar let:hidden let:toggle color="none">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Sveltter
		</span>
	</NavBrand>
	<div class="flex md:order-2 items-center space-x-1">
		{#if session}
			<Avatar id="avatar-menu" src={session.user?.image ?? undefined} size="sm" />
		{:else}
			<Button pill gradient color="purpleToPink" on:click={() => signIn('github')} size="sm"
				>Sign in</Button
			>
		{/if}
		<NavHamburger on:click={toggle} />
	</div>
	{#if session}
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm"> {session.user?.name} </span>
				<span class="block truncate text-sm font-medium"> {session.user?.email} </span>
			</DropdownHeader>
			<DropdownItem href="/user/{session.user.username}">Dashboard</DropdownItem>
			<DropdownItem href="/settings">Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem on:click={() => signOut()}>Sign out</DropdownItem>
		</Dropdown>
	{/if}
	<NavUl {hidden} class="order-1">
		<NavLi href="/" active={current('/')}>Home</NavLi>
		<NavLi href="/posts" active={current('/posts')}>Posts</NavLi>
		<NavLi href="/about" active={current('/about')}>About</NavLi>
	</NavUl>
</Navbar>
