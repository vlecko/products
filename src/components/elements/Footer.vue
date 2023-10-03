<script setup>
import CloseIconButton from './ui/CloseIconButton.vue';

const props = defineProps({
  info: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
	<footer :class="['footer', {loading: isLoading}]">
		<div class="footer__info">{{ isLoading ? '' : info }}</div>
		<CloseIconButton class="close-icon-btn" aria-label="Скрыть" :height="24" :width="24" />
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	position: relative;
	width: 100%;
	height: 72px;
	border-radius: 12px;
	border: 1px solid var(--primary-border, #4D4D4D);
	padding: 18px 36px 18px 18px;
	background: var(--seondary-bg, #262626);

	.footer__info {
		width: 699px;
		height: 36px;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.footer.loading {
	.footer__info {
		background: var(--skeleton, linear-gradient(90deg, #3C3C3C 0%, #444 51.04%, #333 100%));
	}
}
</style>
