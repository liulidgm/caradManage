<template>
    <div class="test1">
        普通Input
        <el-form-item label="公司地址" prop="address">
            <el-input v-model="addComForm.address" auto-complete="off"></el-input>
        </el-form-item>
        Select
        <el-form-item label="所属行业" prop="region">
            <el-select v-model="addComForm.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return{}
        }
    }
</script>
<style type="text/css">
    
</style>