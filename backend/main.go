package main

import (
	"backend/config"
	"backend/controllers"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Inisialisasi database
	config.ConnectDB()

	r := mux.NewRouter()

	// Endpoint
	r.HandleFunc("/register", controllers.Register).Methods("POST")
	r.HandleFunc("/login", controllers.Login).Methods("POST")

	// Tambahkan CORS
	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", cors(r)))
}
