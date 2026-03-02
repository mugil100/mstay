/**
 * src/components/ChatBox.jsx - Chat module placeholder
 *
 * TODO: Chat Module Integration
 *   - Backend: Add Chat model (messages, participants, threadId)
 *   - Real-time: Integrate Socket.IO (backend) + socket.io-client (frontend)
 *   - Each Enquiry can spawn a Chat thread (chatThreadId on Enquiry model)
 *   - This component will receive a threadId prop and display messages
 *
 * For mobile expansion: React Native can reuse the same Socket.IO backend
 */

const ChatBox = ({ threadId }) => {
    return (
        <div className="chatbox-placeholder">
            <div className="chatbox-header">
                <span>💬 Chat</span>
            </div>
            <div className="chatbox-body">
                <p className="placeholder-text">
                    Chat module coming soon.
                    {threadId && ` (Thread: ${threadId})`}
                </p>
                {/* TODO: Render message list + input box here */}
                {/* TODO: Connect to Socket.IO for real-time messaging */}
            </div>
        </div>
    );
};

export default ChatBox;
