<script lang="ts">
	import { user } from '../../stores/user.js';
	import { signIn, actionSignOut } from '../../firebase/firebase-auth.js';
	import { t } from '../../i18n/i18n';

	export let current: string = 'home';
	export let onNavigate: (page: string) => void = () => {};

	interface NavItem {
		id: string;
		icon: string;
		labelKey: string;
	}

	const navItems: NavItem[] = [
		{ id: 'home', icon: 'home', labelKey: 'NAV.HOME' },
		{ id: 'chart', icon: 'chart', labelKey: 'NAV.CHART' },
		{ id: 'saving', icon: 'saving', labelKey: 'NAV.PORTFOLIO' },
		{ id: 'tune', icon: 'tune', labelKey: 'NAV.PROFILE' },
	];

	$: isLoggedIn = !!$user?.uid;
	$: userImg = $user?.photoURL || '/icons/user.svg';
	$: userName = $user?.displayName || 'Guest';
</script>

<aside class="sidebar">
	<div class="sidebar-header">
		<img src="/icons/gofire.svg" alt="GoFire" class="logo" />
		<span class="logo-text">GoFire</span>
	</div>

	<nav class="nav-menu">
		{#each navItems as item}
			<button
				class="nav-item"
				class:active={current === item.id}
				on:click={() => onNavigate(item.id)}
			>
				<img
					src="/icons/{item.icon}.svg"
					alt={item.labelKey}
					class="nav-icon"
					class:active={current === item.id}
				/>
				<span class="nav-label">{$t(item.labelKey)}</span>
			</button>
		{/each}
	</nav>

	<div class="sidebar-footer">
		{#if isLoggedIn}
			<div class="user-info">
				<img src={userImg} alt={userName} class="user-avatar" />
				<div class="user-details">
					<span class="user-name">{userName}</span>
					<button class="auth-btn logout" on:click={actionSignOut}>
						<img src="/icons/logout.svg" alt="logout" class="auth-icon" />
						{$t('AUTH.LOGOUT')}
					</button>
				</div>
			</div>
		{:else}
			<button class="login-card" on:click={signIn}>
				<div class="login-content">
					<img src="/icons/user.svg" alt="guest" class="guest-avatar" />
					<div class="login-text">
						<span class="guest-label">Guest</span>
						<span class="login-hint">{$t('AUTH.LOGIN')}</span>
					</div>
				</div>
				<img src="/icons/login.svg" alt="login" class="login-arrow" />
			</button>
		{/if}
	</div>
</aside>

<style>
	.sidebar {
		width: 280px;
		height: 100vh;
		background: var(--card__background);
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 50;
		border-right: 1px solid var(--border-color);
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		margin-bottom: 2rem;
	}

	.logo {
		width: 40px;
		height: 40px;
		border-radius: 12px;
	}

	.logo-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
	}

	.nav-menu {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border-radius: 16px;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		width: 100%;
		text-align: left;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.nav-item.active {
		background: var(--secondary);
	}

	.nav-icon {
		width: 24px;
		height: 24px;
		filter: brightness(0) invert(1);
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}

	.nav-icon.active {
		opacity: 1;
	}

	.nav-label {
		color: var(--primary);
		font-size: 1rem;
		font-weight: 500;
		opacity: 0.9;
	}

	.nav-item.active .nav-label {
		opacity: 1;
		font-weight: 600;
	}

	.sidebar-footer {
		border-top: 1px solid var(--border-color);
		padding-top: 1.5rem;
		margin-top: auto;
	}

	/* Logged in user */
	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.user-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--secondary);
	}

	.user-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.user-name {
		color: var(--primary);
		font-weight: 600;
		font-size: 0.95rem;
	}

	.auth-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		color: var(--tertiary);
		font-size: 0.85rem;
		cursor: pointer;
		padding: 0;
		text-align: left;
		transition: all 0.2s;
	}

	.auth-btn:hover {
		color: var(--secondary);
	}

	.auth-icon {
		width: 14px;
		height: 14px;
		filter: brightness(0) invert(0.6);
		transition: filter 0.2s;
	}

	.auth-btn:hover .auth-icon {
		filter: var(--filter);
	}

	/* Guest login card */
	.login-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem;
		background: rgba(232, 76, 43, 0.1);
		border: 1px solid rgba(232, 76, 43, 0.3);
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.login-card:hover {
		background: rgba(232, 76, 43, 0.2);
		border-color: var(--secondary);
	}

	.login-content {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.guest-avatar {
		width: 40px;
		height: 40px;
		padding: 8px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		filter: brightness(0) invert(1);
		opacity: 0.7;
	}

	.login-text {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.guest-label {
		color: var(--primary);
		font-weight: 600;
		font-size: 0.95rem;
	}

	.login-hint {
		color: var(--secondary);
		font-size: 0.8rem;
		font-weight: 500;
	}

	.login-arrow {
		width: 20px;
		height: 20px;
		filter: var(--filter);
	}
</style>
