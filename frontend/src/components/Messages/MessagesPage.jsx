import { useState } from "react";
import ConversationList, { CONVERSATIONS } from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function MessagesPage() {
  const [activePerson, setActivePerson] = useState(CONVERSATIONS[0]);
  const [searchVal, setSearchVal] = useState("");

  const handleSelect = (conv) => setActivePerson(conv);

  return (
    <div className="page active" id="messages-page" style={{ paddingTop: 84, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        <div className="messages-layout">
          <ConversationList
            activeConv={activePerson.name}
            onSelect={handleSelect}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />
          <ChatWindow person={activePerson} key={activePerson.name} />
        </div>
      </div>
    </div>
  );
}
