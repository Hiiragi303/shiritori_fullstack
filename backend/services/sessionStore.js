const sessions = new Map();

function getSession(sessionId) {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, { words: [] });
    }
    return sessions.get(sessionId);
}

module.exports = { getSession };