"use client";

import { rand } from "@/app/_utils";
import { redirect, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/signin/page";
import SignOutButton from "@/components/signout/page";
import Profile from "@/components/profile/page";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "chat-component": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function Chat({
  params,
}: {
  params: { userId: string; sessionId: string };
}) {
  const { userId, sessionId } = params;
  const [diagnostics, setDiagnostics] = useState<any>([]);
  const [sessionList, setSessionsList] = useState<any>([]);
  const router = useRouter();
  const chatComponentRef = useRef<HTMLElement>(null);
  const { data: auth, status } = useSession();

  //--------------------------------------------------------------------------------

  const startNewSession = (userId: string) => {
    router.replace(`/${userId}/${rand()}`);
  };
  const loadSession = (userId: string, sessionId: string) => {
    router.replace(`/${userId}/${sessionId}`);
  };

  const chatComponentCustomStyles = {
    AccentHigh: "#3073F9",
    AccentLight: "#474C66",
    AccentDark: "#3073F9",
    TextColor: "#15192C",
    BackgroundColor: "rgb(131, 134, 135)",
    ForegroundColor: "#f5f5f5",
    FormBackgroundColor: "#f5f5f5",
    BorderRadius: "10px",
    BorderWidth: "3px",
    FontBaseSize: "14px",
  };

  React.useEffect(() => {
    const fetchSessions = async (userId: string) => {
      const response = await fetch(`/api/sessions/${userId}`);
      const { diagnostics, items } = await response.json();
      console.log({ diagnostics, items });
      setDiagnostics(diagnostics);
      setSessionsList(items);
    };

    const onChatSubmit = async (
      event: CustomEvent,
      userId: string,
      sessionId: string
    ) => {
      console.log(event.detail);
      const response = await fetch(`/api/threads/${userId}/${sessionId}`, {
        method: "POST",
        body: JSON.stringify({
          ...event.detail,
          userId,
          sessionId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { diagnostics } = await response.json();
      setDiagnostics(diagnostics);
      await fetchSessions(userId);
    };

    const onChatReset = async (
      event: CustomEvent,
      userId: string,
      sessionId: string
    ) => {
      const response = await fetch(`/api/threads/${userId}/${sessionId}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId,
          sessionId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { diagnostics } = await response.json();
      setDiagnostics(diagnostics);
      router.push(`/${userId}/${rand()}`);
    };

    document.addEventListener(
      "chat-submit",
      (event) => {
        onChatSubmit(event as any, userId, sessionId);
      },
      {
        once: true,
      }
    );
    document.addEventListener(
      "chat-reset",
      () => {
        onChatReset(event as any, userId, sessionId);
      },
      { once: true }
    );

    fetchSessions(userId);

    import("../../../../public/rag/chat-component.js").then(
      async (_ChatComponentModule) => {
        console.log("Loading chat-component.js");

        const response = await fetch(`/api/threads/${userId}/${sessionId}`);
        const { diagnostics, items } = await response.json();
        setDiagnostics(diagnostics);

        if (chatComponentRef.current && items.length > 0) {
          (chatComponentRef.current as any).chatThread = items;
          (chatComponentRef.current as any).isChatStarted = true;
          (chatComponentRef.current as any).isDefaultPromptsEnabled = false;
        }
      }
    );
  }, [userId, sessionId, router]);

  if (typeof window !== "undefined" && status === "loading") return null;
  return (
    <main className={styles.main}>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.root}`]: {
            position: "absolute",
            top: "0",
            left: "0",
          },
          ["p"]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1.5rem 0",
          },
          ["img"]: {
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            aspectRatio: 1 / 1,
            margin: "4px",
          },
        }}
        className={styles.sidebar}
        collapsed={false}
      >
        <p>
          <Profile />
        </p>
        <Menu>
          <MenuItem
            onClick={() => startNewSession(userId)}
            className={styles.newSessionBtn}
          >
            Start New Session
          </MenuItem>
          <SubMenu label="Sessions">
            {sessionList.map(function (s: any) {
              return (
                <MenuItem
                  key={s.SessionId}
                  onClick={() => loadSession(s.UserId, s.SessionId)}
                >
                  {s.sessionName}
                </MenuItem>
              );
            })}
          </SubMenu>
        </Menu>
        <p className={styles.signinout}>
          {status === "authenticated" ? <SignOutButton /> : <SignInButton />}
        </p>
      </Sidebar>
      <article className={styles.chatContainer}>
        <section className={styles.chatContainer}>
          <div className={styles.center}>
            {auth && (
              <chat-component
                className={styles.chatComponent}
                title="Chat with our support Agent"
                data-interaction-model="chat"
                data-api-url={process.env.NEXT_PUBLIC_RAG_API_URL}
                data-use-stream="true"
                data-custom-styles={JSON.stringify(chatComponentCustomStyles)}
                data-custom-branding="false"
                data-enable-local-storage="false"
                data-enable-chat-scroll="true"
                ref={chatComponentRef}
              ></chat-component>
            )}
          </div>
        </section>
        {diagnostics.clientSideRequestStatistics && (
          <footer className={styles.sticky}>
            <div>
              <span>DB Req. duration: </span>
              <span>
                {diagnostics.clientSideRequestStatistics?.requestDurationInMs}ms
              </span>
            </div>
            –
            <div>
              <span>Operation Type: </span>
              <span>
                {
                  diagnostics.clientSideRequestStatistics
                    ?.gatewayStatistics?.[0]?.operationType
                }
                &nbsp; (
                {
                  diagnostics.clientSideRequestStatistics
                    ?.gatewayStatistics?.[0]?.durationInMs
                }
                ms)
              </span>
            </div>
            –
            <div>
              <span>SDK: </span>
              <span>{diagnostics.clientConfig?.sDKVersion}</span>
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
