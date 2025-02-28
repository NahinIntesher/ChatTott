package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// WebSocket upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		if origin == "http://localhost:3000" || origin == "https://chattott.com" {
			return true
		}
		return false
	},
}

// Connection struct to store WebSocket connection
type Connection struct {
	connection *websocket.Conn
	send chan []byte
}

var clients = make(map[*Connection]bool) // Connected clients
func webSocketHandler(w http.ResponseWriter, r *http.Request) {
	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error Upgrading: ", err)
		return
	}
	defer connection.Close()


	client := &Connection{connection: connection, send: make(chan []byte)}
	clients[client] = true
		
		go func(){
			for message := range client.send{
				for client := range clients{
					err := client.connection.WriteMessage(websocket.TextMessage, message)
					if err != nil {
						log.Println("Error sending message: ", err)
						client.connection.Close()
						delete(clients, client)
					}
				}
			}
		}()

	for {
		_, message, err := connection.ReadMessage()
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}
		// Broadcast message to all clients
		for client := range clients {
			client.send <- message
		}
	}
}

func main() {
	const port = ":9000"
	log.Println("Server started on port", port)
	http.HandleFunc("/ws", webSocketHandler)
	err  := http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("Error starting server: ", err)
		return
	}
}