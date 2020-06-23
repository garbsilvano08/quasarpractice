<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
What is Geer App Builder?
===

__Hello World__ sa intoong lahat

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-login></u-q-login>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code above__ can be `bla blab abla`

``` html
{{ code }}
```


</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQLogin from '../../components/Front/UQLogin'

export default
{
    data:() =>
    ({
        code: `<div>hellworld</div><div></div>`
    }),
    components: { UQLogin },
    mounted() { },
    methods: { },
}
</script>