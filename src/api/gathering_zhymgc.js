import request from "@/utils/request"

export default {
    getList(){
        return request({
            url:'gathering',
            method:'get'
        });
    },
    search(page,size,searchMap) {
        // return request({
        //     url:'gathering/search/'+page+'/'+size+'',
        //     method: 'post',
        //     data: searchMap
        // });
        return request({
            url:`/gathering/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        });
    }
}

