<script setup>
const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
	<input
		class="input__field"
		:id="id"
		:name="name"
		type="text"
		:value="modelValue"
		:placeholder="placeholder"
		@input="emit('update:modelValue', $event.target.value)"
	/>
</template>

<style lang="scss" scoped>
.input__field {
	width: 100%;
	height: 40px;
	padding: 12px;
	border-radius: 4px;
	border: 1px solid var(--primary-border, #4D4D4D);
	color: rgba(255, 255, 255, 0.4000000059604645);
	font-size: 14px;
	font-family: inherit;
	font-weight: 500;
	background: var(--seondary-bg, #262626);
	user-select: text;
	outline: none;
	appearance: none;
	transition: all .2s;
}
</style>
