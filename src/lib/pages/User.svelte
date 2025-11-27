<script lang="ts">
	import { actionSignOut, signIn } from '../../firebase/firebase-auth.js';
	import Tooltip from '../atoms/Tooltip.svelte';
	import { user } from '../../stores/user.js';
	import { data, resetData } from '../../stores/data.js';
	import LangSelect from '../atoms/LangSelect.svelte';
	import CurrencySelect from '../atoms/CurrencySelect.svelte';
	import { t } from '../../i18n/i18n';
	import Feedback from '../atoms/Feedback.svelte';
	import Switch from '../atoms/Switch.svelte';

	let showDeleteConfirm = false;

	const handleExport = () => {
		const exportData = {
			data: $data,
			exportDate: new Date().toISOString(),
			version: '2.0.0'
		};
		const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `gofire-backup-${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleImport = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';
		input.onchange = async (e: Event) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const text = await file.text();
				try {
					const imported = JSON.parse(text);
					if (imported.data && Array.isArray(imported.data)) {
						data.set(imported.data);
					}
				} catch (err) {
					console.error('Import failed:', err);
				}
			}
		};
		input.click();
	};

	const handleDeleteData = () => {
		resetData();
		showDeleteConfirm = false;
	};
</script>

<div class="user-page">
	<header class="page-header">
		<h1>{$t('PROFILE.ONLINE.TITLE')}</h1>
		<p class="header-subtitle">{$t('PROFILE.ONLINE.SUBTITLE')}</p>
	</header>

	<!-- Profile Card -->
	<div class="profile-section">
		{#if $user?.uid}
			<div class="profile-card card__background">
				<div class="profile-main">
					<img class="profile-avatar" src={$user.photoURL} alt="user" />
					<div class="profile-info">
						<h2 class="profile-name">{$user.displayName}</h2>
						<p class="profile-email">{$user.email}</p>
						<div class="profile-badge">
							<img src="/icons/check.svg" alt="synced" class="badge-icon" />
							<span>Synced</span>
						</div>
					</div>
				</div>
				<Tooltip label={$t('PROFILE.ONLINE.TOOLTIPS.LOGOUT')}>
					<button class="logout-btn" on:click={actionSignOut}>
						<img src="/icons/logout.svg" alt="logout" class="btn-icon" />
						<span>{$t('AUTH.LOGOUT')}</span>
					</button>
				</Tooltip>
			</div>
		{:else}
			<div class="login-card card__background">
				<div class="login-icon-wrap">
					<img src="/icons/user.svg" alt="guest" />
				</div>
				<div class="login-content">
					<h2>{$t('PROFILE.OFFLINE.TITLE')}</h2>
					<p>Sign in to sync your data across devices</p>
				</div>
				<Tooltip label={$t('PROFILE.OFFLINE.TOOLTIPS.LOGIN')}>
					<button class="login-btn" on:click={signIn}>
						<img src="/icons/login.svg" alt="login" class="btn-icon" />
						<span>{$t('AUTH.LOGIN')}</span>
					</button>
				</Tooltip>
			</div>
		{/if}
	</div>

	<!-- Preferences Section -->
	<section class="settings-section">
		<div class="section-header">
			<img src="/icons/tune.svg" alt="preferences" class="section-icon" />
			<h3>Preferences</h3>
		</div>
		<div class="settings-list">
			<div class="setting-item card__background">
				<div class="setting-icon-wrap theme">
					<img src="/icons/highlight.svg" alt="theme" class="setting-icon" />
				</div>
				<div class="setting-info">
					<span class="setting-name">Theme</span>
					<span class="setting-desc">Dark / Light mode</span>
				</div>
				<Switch />
			</div>

			<div class="setting-item card__background">
				<div class="setting-icon-wrap language">
					<img src="/icons/language.svg" alt="language" class="setting-icon" />
				</div>
				<div class="setting-info">
					<span class="setting-name">{$t('PROFILE.OPTIONS.LANGUAGE')}</span>
					<span class="setting-desc">Select language</span>
				</div>
				<LangSelect />
			</div>

			<div class="setting-item card__background">
				<div class="setting-icon-wrap currency">
					<img src="/icons/saving.svg" alt="currency" class="setting-icon" />
				</div>
				<div class="setting-info">
					<span class="setting-name">{$t('PROFILE.OPTIONS.CURRENCY')}</span>
					<span class="setting-desc">Select currency</span>
				</div>
				<CurrencySelect />
			</div>
		</div>
	</section>

	<!-- Data Management Section -->
	<section class="settings-section">
		<div class="section-header">
			<img src="/icons/saving.svg" alt="data" class="section-icon" />
			<h3>Data Management</h3>
		</div>
		<div class="settings-list">
			<button class="setting-item card__background clickable" on:click={handleExport}>
				<div class="setting-icon-wrap export">
					<img src="/icons/up.svg" alt="export" class="setting-icon" />
				</div>
				<div class="setting-info">
					<span class="setting-name">Export Data</span>
					<span class="setting-desc">Download backup file</span>
				</div>
				<img src="/icons/down.svg" alt="arrow" class="arrow-icon up" />
			</button>

			<button class="setting-item card__background clickable" on:click={handleImport}>
				<div class="setting-icon-wrap import">
					<img src="/icons/down.svg" alt="import" class="setting-icon" />
				</div>
				<div class="setting-info">
					<span class="setting-name">Import Data</span>
					<span class="setting-desc">Restore from backup</span>
				</div>
				<img src="/icons/down.svg" alt="arrow" class="arrow-icon" />
			</button>

			{#if showDeleteConfirm}
				<div class="confirm-card card__background">
					<p>Delete all data?</p>
					<div class="confirm-actions">
						<button class="confirm-btn cancel" on:click={() => showDeleteConfirm = false}>Cancel</button>
						<button class="confirm-btn delete" on:click={handleDeleteData}>Delete</button>
					</div>
				</div>
			{:else}
				<button class="setting-item card__background clickable danger" on:click={() => showDeleteConfirm = true}>
					<div class="setting-icon-wrap delete">
						<img src="/icons/delete.svg" alt="delete" class="setting-icon" />
					</div>
					<div class="setting-info">
						<span class="setting-name danger-text">Delete All Data</span>
						<span class="setting-desc">Reset the app</span>
					</div>
					<img src="/icons/down.svg" alt="arrow" class="arrow-icon" />
				</button>
			{/if}
		</div>
	</section>

	<!-- About Section -->
	<section class="settings-section">
		<div class="section-header">
			<img src="/icons/info.svg" alt="about" class="section-icon" />
			<h3>About</h3>
		</div>
		<div class="about-grid">
			<div class="about-card card__background">
				<div class="about-header">
					<img src="/icons/gofire.svg" alt="GoFire" class="app-logo" />
					<div class="about-info">
						<h4>GoFire</h4>
						<span class="version">v2.0.0</span>
					</div>
				</div>
				<p class="about-desc">Track your path to financial independence</p>
				<a href="https://github.com/alcibiadesc/GoFire" target="_blank" rel="noopener" class="about-link">
					<img src="/icons/github.svg" alt="github" class="link-icon" />
					<span>GitHub</span>
				</a>
			</div>

			<div class="feedback-card card__background">
				<div class="feedback-header">
					<img src="/icons/message.svg" alt="feedback" class="feedback-icon" />
					<span class="feedback-title">{$t('PROFILE.OPTIONS.FEEDBACK')}</span>
				</div>
				<Feedback />
			</div>
		</div>
	</section>
</div>

<style>
	.user-page {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Header */
	.page-header {
		margin-bottom: 0;
	}

	.page-header h1 {
		margin-bottom: 0.5rem;
	}

	.header-subtitle {
		color: var(--tertiary);
		font-size: 0.9rem;
		margin: 0;
	}

	/* Profile Section */
	.profile-section {
		margin: 0;
	}

	.profile-card {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.profile-main {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.profile-avatar {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--secondary);
		flex-shrink: 0;
	}

	.profile-info {
		flex: 1;
		min-width: 0;
	}

	.profile-name {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--primary);
		margin: 0 0 0.25rem 0;
	}

	.profile-email {
		font-size: 0.85rem;
		color: var(--tertiary);
		margin: 0 0 0.625rem 0;
	}

	.profile-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.625rem;
		background: rgba(16, 185, 129, 0.15);
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		color: #10b981;
	}

	.badge-icon {
		width: 0.875rem;
		height: 0.875rem;
		filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(104%) contrast(86%);
	}

	.logout-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.875rem 1rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 12px;
		color: #ef4444;
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.logout-btn:hover {
		background: rgba(239, 68, 68, 0.2);
	}

	.logout-btn .btn-icon {
		width: 1.125rem;
		height: 1.125rem;
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(336deg) brightness(95%) contrast(95%);
	}

	/* Login Card */
	.login-card {
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.25rem;
	}

	.login-icon-wrap {
		width: 5rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}

	.login-icon-wrap img {
		width: 2.5rem;
		height: 2.5rem;
		filter: brightness(0) invert(0.6);
	}

	.login-content h2 {
		font-size: 1.25rem;
		color: var(--primary);
		margin: 0 0 0.375rem 0;
	}

	.login-content p {
		font-size: 0.9rem;
		color: var(--tertiary);
		margin: 0;
	}

	.login-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 2rem;
		background: var(--secondary);
		border: none;
		border-radius: 12px;
		color: white;
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.login-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.login-btn .btn-icon {
		width: 1.125rem;
		height: 1.125rem;
		filter: brightness(0) invert(1);
	}

	/* Settings Section */
	.settings-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border-color);
	}

	.section-icon {
		width: 1.375rem;
		height: 1.375rem;
		filter: var(--filter);
	}

	.section-header h3 {
		font-size: 1rem;
		color: var(--primary);
		margin: 0;
		font-weight: 600;
	}

	/* Settings List */
	.settings-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.setting-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.125rem 1.25rem;
		border: none;
		text-align: left;
		width: 100%;
	}

	.setting-item.clickable {
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.setting-item.clickable:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	.setting-icon-wrap {
		width: 2.75rem;
		height: 2.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.1);
		flex-shrink: 0;
	}

	.setting-icon-wrap.theme {
		background: rgba(250, 204, 21, 0.15);
	}

	.setting-icon-wrap.theme .setting-icon {
		filter: invert(76%) sepia(61%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(96%);
	}

	.setting-icon-wrap.language {
		background: rgba(59, 130, 246, 0.15);
	}

	.setting-icon-wrap.language .setting-icon {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(207deg) brightness(100%) contrast(95%);
	}

	.setting-icon-wrap.currency {
		background: rgba(16, 185, 129, 0.15);
	}

	.setting-icon-wrap.currency .setting-icon {
		filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(118deg) brightness(104%) contrast(86%);
	}

	.setting-icon-wrap.export {
		background: rgba(139, 92, 246, 0.15);
	}

	.setting-icon-wrap.export .setting-icon {
		filter: invert(45%) sepia(93%) saturate(1500%) hue-rotate(240deg) brightness(90%) contrast(95%);
	}

	.setting-icon-wrap.import {
		background: rgba(59, 130, 246, 0.15);
	}

	.setting-icon-wrap.import .setting-icon {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(207deg) brightness(100%) contrast(95%);
	}

	.setting-icon-wrap.delete {
		background: rgba(239, 68, 68, 0.15);
	}

	.setting-icon-wrap.delete .setting-icon {
		filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(336deg) brightness(95%) contrast(95%);
	}

	.setting-icon {
		width: 1.375rem;
		height: 1.375rem;
	}

	.setting-info {
		flex: 1;
		min-width: 0;
	}

	.setting-name {
		display: block;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 0.125rem;
	}

	.setting-name.danger-text {
		color: #ef4444;
	}

	.setting-desc {
		display: block;
		font-size: 0.8rem;
		color: var(--tertiary);
	}

	.arrow-icon {
		width: 1.125rem;
		height: 1.125rem;
		filter: brightness(0) invert(0.4);
		transform: rotate(-90deg);
		flex-shrink: 0;
	}

	.arrow-icon.up {
		transform: rotate(90deg);
	}

	/* Confirm Card */
	.confirm-card {
		padding: 1.5rem;
		text-align: center;
	}

	.confirm-card p {
		font-size: 1rem;
		font-weight: 600;
		color: var(--primary);
		margin: 0 0 1rem 0;
	}

	.confirm-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
	}

	.confirm-btn {
		padding: 0.625rem 1.25rem;
		border-radius: 10px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.confirm-btn.cancel {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid var(--border-color);
		color: var(--primary);
	}

	.confirm-btn.cancel:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.confirm-btn.delete {
		background: #ef4444;
		border: none;
		color: white;
	}

	.confirm-btn.delete:hover {
		background: #dc2626;
	}

	/* About Grid */
	.about-grid {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.about-card {
		padding: 1.5rem;
	}

	.about-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.app-logo {
		width: 3rem;
		height: 3rem;
		border-radius: 12px;
	}

	.about-info h4 {
		font-size: 1.125rem;
		color: var(--primary);
		margin: 0 0 0.125rem 0;
	}

	.version {
		font-size: 0.8rem;
		color: var(--tertiary);
	}

	.about-desc {
		font-size: 0.9rem;
		color: var(--tertiary);
		margin: 0 0 1.25rem 0;
		line-height: 1.5;
	}

	.about-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-color);
		border-radius: 10px;
		color: var(--tertiary);
		font-size: 0.85rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.about-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--primary);
	}

	.link-icon {
		width: 1rem;
		height: 1rem;
		filter: brightness(0) invert(0.6);
	}

	/* Feedback Card */
	.feedback-card {
		padding: 1.5rem;
	}

	.feedback-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.feedback-icon {
		width: 1.25rem;
		height: 1.25rem;
		filter: var(--filter);
	}

	.feedback-title {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--primary);
	}

	/* Tablet */
	@media (min-width: 768px) {
		.user-page {
			gap: 2.5rem;
		}

		.profile-card {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 1.75rem;
		}

		.profile-avatar {
			width: 72px;
			height: 72px;
		}

		.logout-btn {
			width: auto;
			padding: 0.875rem 1.5rem;
		}

		.login-card {
			flex-direction: row;
			text-align: left;
			padding: 2rem;
			gap: 1.5rem;
		}

		.login-content {
			flex: 1;
		}

		.settings-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		.setting-item.danger {
			grid-column: span 2;
		}

		.confirm-card {
			grid-column: span 2;
		}

		.about-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		.user-page {
			gap: 3rem;
		}

		.page-header h1 {
			font-size: 1.75rem;
		}

		.profile-card {
			padding: 2rem;
		}

		.profile-avatar {
			width: 80px;
			height: 80px;
		}

		.profile-name {
			font-size: 1.375rem;
		}

		.section-header {
			padding-bottom: 1rem;
		}

		.section-header h3 {
			font-size: 1.125rem;
		}

		.section-icon {
			width: 1.5rem;
			height: 1.5rem;
		}

		.settings-list {
			gap: 1.25rem;
		}

		.setting-item {
			padding: 1.25rem 1.5rem;
		}

		.setting-icon-wrap {
			width: 3rem;
			height: 3rem;
		}

		.setting-icon {
			width: 1.5rem;
			height: 1.5rem;
		}

		.setting-name {
			font-size: 1rem;
		}

		.setting-desc {
			font-size: 0.85rem;
		}
	}

	@media (min-width: 1280px) {
		.settings-list {
			grid-template-columns: repeat(3, 1fr);
		}

		.setting-item.danger {
			grid-column: span 1;
		}

		.confirm-card {
			grid-column: span 1;
		}

		.profile-avatar {
			width: 88px;
			height: 88px;
		}
	}
</style>
