const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let i = 0
    let max = 0
    let max_i = 0

    if(blogs.length === 0)
        return 0

    while(i < blogs.length)
    {
        if(blogs[i].likes > max)
            {
                max = blogs[i].likes
                max_i = i
            }
        i++
    }

    return blogs[max_i]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}