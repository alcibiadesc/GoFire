<script lang="ts">
	import { user } from '../../stores/user.js';
	import { sidebarCollapsed } from '../../stores/sidebar.js';
	import { signIn, actionSignOut } from '../../firebase/firebase-auth.js';
	import { t } from '../../i18n/i18n';

	export let current: string = 'home';
	export let onNavigate: (page: string) => void = () => {};

	$: collapsed = $sidebarCollapsed;

	function toggleCollapse() {
		sidebarCollapsed.update(v => !v);
	}

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

<aside class="sidebar" class:collapsed>
	<button class="collapse-btn" on:click={toggleCollapse} title={collapsed ? 'Expand' : 'Collapse'}>
		<img
			src="/icons/arrow.svg"
			alt="toggle"
			class="collapse-icon"
			class:rotated={collapsed}
		/>
	</button>
	<div class="sidebar-header">
		<img src="/icons/gofire.svg" alt="GoFire" class="logo" />
		{#if !collapsed}
			<span class="logo-text">GoFire</span>
		{/if}
	</div>

	<nav class="nav-menu">
		{#each navItems as item}
			<button
				class="nav-item"
				class:active={current === item.id}
				on:click={() => onNavigate(item.id)}
				title={collapsed ? $t(item.labelKey) : ''}
			>
				<img
					src="/icons/{item.icon}.svg"
					alt={item.labelKey}
					class="nav-icon"
					class:active={current === item.id}
				/>
				{#if !collapsed}
					<span class="nav-label">{$t(item.labelKey)}</span>
				{/if}
			</button>
		{/each}
	</nav>

	<div class="sidebar-footer">
		{#if isLoggedIn}
			<div class="user-info">
				<img src={userImg} alt={userName} class="user-avatar" />
				{#if !collapsed}
					<div class="user-details">
						<span class="user-name">{userName}</span>
						<button class="auth-btn logout" on:click={actionSignOut}>
							<img src="/icons/logout.svg" alt="logout" class="auth-icon" />
							{$t('AUTH.LOGOUT')}
						</button>
					</div>
				{/if}
			</div>
		{:else}
			<button class="login-card" on:click={signIn} title={collapsed ? $t('AUTH.LOGIN') : ''}>
				<div class="login-content">
					<img src="/icons/user.svg" alt="guest" class="guest-avatar" />
					{#if !collapsed}
						<div class="login-text">
							<span class="guest-label">Guest</span>
							<span class="login-hint">{$t('AUTH.LOGIN')}</span>
						</div>
					{/if}
				</div>
				{#if !collapsed}
					<img src="/icons/login.svg" alt="login" class="login-arrow" />
				{/if}
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
		transition: width 0.3s ease;
	}

	.sidebar.collapsed {
		width: 88px;
		padding: 1.5rem 1rem;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		margin-bottom: 2rem;
	}

	.sidebar.collapsed .sidebar-header {
		justify-content: center;
	}

	.logo {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		flex-shrink: 0;
	}

	.logo-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
		white-space: nowrap;
		overflow: hidden;
	}

	.collapse-btn {
		position: absolute;
		right: -14px;
		top: 2rem;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--secondary);
		border: 2px solid var(--background);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
		box-shadow: 0 2px 8px rgba(232, 76, 43, 0.3);
		z-index: 60;
	}

	.collapse-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(232, 76, 43, 0.4);
	}

	.collapse-icon {
		width: 14px;
		height: 14px;
		filter: brightness(0) invert(1);
		transform: rotate(180deg);
		transition: transform 0.3s ease;
	}

	.collapse-icon.rotated {
		transform: rotate(0deg);
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

	/* Collapsed nav items */
	.sidebar.collapsed .nav-item {
		justify-content: center;
		padding: 1rem;
	}

	.sidebar.collapsed .nav-icon {
		margin: 0;
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

	/* Collapsed footer */
	.sidebar.collapsed .user-info {
		justify-content: center;
	}

	.sidebar.collapsed .user-avatar {
		width: 40px;
		height: 40px;
	}

	.sidebar.collapsed .login-card {
		justify-content: center;
		padding: 0.75rem;
	}

	.sidebar.collapsed .guest-avatar {
		width: 36px;
		height: 36px;
		padding: 6px;
	}
</style>
