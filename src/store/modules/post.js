export default {
    actions: {
        async fetchPosts(context){
            const res = await fetch(
                process.env.VUE_APP_API_URL,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );
            const posts = await res.json();
            context.commit('updatePosts', posts)
        },

        ratePost(context, post){
            context.commit('ratePost', post);
        }


    },
    mutations: {
        updatePosts(state, posts){
            state.posts = posts
        },

        ratePost(context, post){
            console.log(post);
            let counter = 0;
             let ratedItem = false;

             if(post.rated === true) {
                 counter--;
                 ratedItem = false;
             } else {
                 counter++;
                 ratedItem = true;
             }
             const itemId = post.id;
             const itemLike = parseInt(post.like);
             console.log('counter', counter);
             console.log('itemLike', itemLike);
             const putMethod = {
                 method: 'PUT',
                 headers: {
                     'Content-type': 'application/json; charset=UTF-8'
                 },
                 body: JSON.stringify(
                     { ...post, rated: ratedItem,  like: itemLike + counter }
                 )
             }
             fetch(process.env.VUE_APP_API_URL + itemId, putMethod)
                 .then(response => response.json())
                 .then(res => console.log(res))
                 .catch(err => console.error(err));

            //context.dispatch('ratePost', post);
        }
    },
    state: {
        posts: []
    },
    getters: {
        getAllPosts(state){
            return state.posts
        },

        getPost(state) {
            return state.posts.find(post => post);
        }

    }
}