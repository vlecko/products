<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CloseIconButton from '@/components/elements/ui/CloseIconButton.vue';

const emit = defineEmits(['close', 'mount', 'unmount']);

const modalRef = ref(null);

onMounted(() => {
  modalRef.value.focus();
  emit('mount', modalRef.value);
});

onUnmounted(() => emit('unmount'));

const onKeyDown = (event) => {
  if (event.key === 'Escape') {
    emit('close', modalRef.value);
  }
};
</script>

<template>
	<div ref="modalRef" tabindex="-1" class="modal" @keydown="onKeyDown">
		<div class="modal__content">
			<CloseIconButton
				class="close-icon-btn"
				aria-label="Закрыть"
				:height="24"
				:width="24"
				@click="emit('close', modalRef)"
			/>
			<header class="modal__header">
				<slot name="header" />
			</header>
			<div class="modal__body">
				<slot name="body" />
			</div>
			<div class="modal__footer">
				<slot name="footer" :modalRef="modalRef" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.modal {
	position: absolute;
	top: 0;
	right: -250px;
	width: 250px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top-right-radius: 12px;
	border-bottom-right-radius: 12px;
	border: 1px solid var(--primary-border, #4D4D4D);
	background: rgba(38, 38, 38, 0.50);
	backdrop-filter: blur(8px);
	outline: none;
	transition: right 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

	.modal__content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;

		.modal__header {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.modal__body {
			width: 220px;
			height: 208px;
			border-top: 1px solid var(--primary-border, #4D4D4D);
			border-bottom: 1px solid var(--primary-border, #4D4D4D);
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 16px 0 24px;
		}

		.modal__footer {
			width: 220px;
			padding: 18.5px 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
