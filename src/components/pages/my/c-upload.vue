<template>
    <div class="c-upload" :style="getStyle">
        <el-upload
            class="avatar-uploader"
            name="photos"
            :headers="headers"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl | addImagePrefix" class="avatar">
            <i v-if="isUploading" class="el-icon-loading avatar-uploader-icon"></i>
            <img v-else class="el-icon-plus avatar-uploader-icon" src="./../../../../public/images/my/reload.png">
        </el-upload>
    </div>
</template>

<script>
    import dataStore from '../../../js/data-store'
    import { HTTP_CONFIG } from './../../../js/http/config'
    export default {
        name: 'CUpload',
        data() {
            return {
                imageUrl: '',
                isUploading: false,
                uploadUrl: HTTP_CONFIG.BASE_URL + '/public/upload-image',
                headers: {
                    'Authorization': dataStore.getToken() || ''
                }
            }
        },
        props: ['avatarUrl'],
        computed: {
            getStyle() {
                if (!this.imageUrl) {
                    return ''
                }
                return {
                    'background-image': `url(${this.imageUrl}) !important`
                }
            }
        },
        watch: {
            avatarUrl(val) {
                console.log(val)
                this.imageUrl = val
            }
        },
        methods: {
            handleAvatarSuccess(res) {
                console.log(res)
                this.imageUrl = res.data.avatarUrl
                this.isUploading = false
                this.$emit('onUpload', this.imageUrl,res.data.avatarUrl)
            },
            beforeAvatarUpload(file) {
                // console.log(file.type)
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                this.isUploading = true
                return isJPG && isLt2M
            },
            getToken() {
                return {
                    'Authorization': dataStore.getToken() || ''
                }
            },
            onSuccess(res) {
                console.log(res)
            }
        },
        mounted() {
            this.imageUrl = this.avatarUrl
        }
    }
</script>

<style>
    .c-upload {
        background-image: url("./../../../../public/images/public/head-photo.png");
        width: 187px !important;
        height: 187px !important;
        background-size: 187px 187px;
        border-radius: 8px;
        background-position: center;
        background-repeat: no-repeat;
    }

    .avatar-uploader .el-upload {
        /*border: 1px dashed #d9d9d9;*/
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background: rgba(211, 211, 211, 1);
        width: 187px !important;
        height: 187px !important;
        opacity: 0.76;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        width: 60px !important;
        height: 60px !important;
        position: absolute;
        font-size: 60px;
        color: #fff;
        z-index: 10;
    }

    .avatar {
        width: 187px !important;
        height: 187px !important;
        display: block;
    }
</style>
