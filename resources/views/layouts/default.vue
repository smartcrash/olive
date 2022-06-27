<script setup lang="ts">
// This is a peristent layout
// Include me with <template layout="default" />
</script>

<template>
    <section class="section">
        <div class="container">
            <slot />
        </div>
    </section>
</template>

<style lang="scss">
// Use Bulma (https://bulma.io) CSS framework for styling
// Just import what's needed.

@import "bulma/sass/base/_all.sass";
@import "bulma/sass/utilities/_all.sass";

$container-max-width: 844px + (2 * $gap);

// Utilities & helpers
@import "bulma/sass/helpers/spacing.sass";
@import "bulma/sass/helpers/typography.sass";

// Elements & Components
@import "bulma/sass/elements/container.sass";
@import "bulma/sass/layout/section.sass";

@import "bulma/sass/form/shared.sass";
@import "bulma/sass/form/tools.sass";
@import "bulma/sass/form/input-textarea.sass";
</style>
