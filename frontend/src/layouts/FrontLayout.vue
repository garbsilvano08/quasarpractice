<template>
   <div> 
       <div>
           <router-view />
       </div>
   </div>
</template>

<script>
import { postLoginUser } from '../references/url';

export default
{
   data:() =>
   ({
       info:'{"pageInfo":{"index":0,"length":50,"size":3,"total":3},"records":[{"age":0,"auth":false,"authId":0,"card":"","download":false,"faceID":20001,"free":false,"groupId":20,"groupName":"????","icCard":"","id":29,"isSuccess":false,"md5":"78ca15f877847054d241adf7644f6899","monitorStatus":0,"name":"jeric laderas","passType":0,"personId":"1236","picPath":"/storage/emulated/0/vips/20001/797D783F3BB3767147EC543841B7B25F.png","return":false,"sex":1,"total":0,"type":3,"typeID":0,"typeNum":"0","upload":true,"vipID":20001},{"age":0,"auth":false,"authId":0,"card":"","download":false,"faceID":20006,"free":false,"groupId":20,"groupName":"????","icCard":"","id":36,"isSuccess":false,"md5":"b020ab66c08da018f4766cf515a407ec","monitorStatus":0,"name":"Irish John Lomangaya","passType":0,"personId":"123","picPath":"/storage/emulated/0/vips/20006/A72B75E6E4BE50B93EE48E8404860DAF.png","return":false,"sex":1,"total":0,"type":3,"typeID":0,"typeNum":"0","upload":true,"vipID":20006},{"age":0,"auth":false,"authId":0,"download":false,"faceID":20004,"free":false,"groupId":0,"id":39,"isSuccess":false,"md5":"c441d2a983e5813eb1ad8510c4c304ff","monitorStatus":0,"name":"Eimie S. Enriquez","passType":0,"personId":"20004","picPath":"/sdcard/vipImg/20004_1593155627509.jpg","return":false,"sex":0,"total":0,"type":1,"typeID":0,"upload":true,"vipID":20004}]}'
   }),
   mounted()
   {
       console.log(JSON.parse(this.info));
   },
   methods: { },
}
</script>

<style lang="scss">
body {
    background-color: #eee;
    color: #333;
}
</style>