module.exports = player => {
    if (player.queue.length === 0) return player.queue.current.duration;

    let totalQueueDuration = player.queue.current.duration;
    for(let i = 0; i < player.queue.length; i++) {
        totalQueueDuration += player.queue[i].duration;
    }
    return totalQueueDuration;
};
