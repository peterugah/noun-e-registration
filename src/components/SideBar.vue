<template>
  <div class="tabs is-centered">
    <ul>
      <li>
        <router-link :to="{name :'register'}">REGISTER</router-link>
      </li>
      <li>
        <router-link :to="{name :'generate-tag'}">GENERATE TAG</router-link>
      </li>
      <li>
        <router-link :to="{name :'search'}">SEARCH</router-link>
      </li>
      <!-- <li>
        <router-link :to="{name :'mail'}">MAIL</router-link>
      </li> -->
      <li>
        <router-link :to="{name :'scan'}">SCAN</router-link>
      </li>
    </ul>
  </div>
</template>