package com.webflux.pokedex;

import com.webflux.pokedex.model.Pokemon;
import com.webflux.pokedex.repository.PokemonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import reactor.core.publisher.Flux;


@SpringBootApplication
public class PokedexApplication {
	public static void main(String[] args) {SpringApplication.run(PokedexApplication.class, args);}

	@Bean
	CommandLineRunner init (ReactiveMongoOperations operations, PokemonRepository repository){
		return args -> {
			Flux<Pokemon> pokemonFlux = Flux.just(
							new Pokemon(null, "Blastoise", "Shellfish", "Torrente", 9.0),
							new Pokemon(null, "Kakuma", "Cocoon", "Shed Skin", 10.0),
							new Pokemon(null, "Arbok", "Cobra", "Intimidate", 65.0),
							new Pokemon(null, "Sandshrew", "Mouse", "Sand Veil", 12.0),
							new Pokemon(null, "Nidorina", "Poison Pin", "Rivalry", 20.0),
							new Pokemon(null, "Oddish", "Weed", "Chlorophyll", 5.4),
							new Pokemon(null, "Paras", "Mushroom", "Dry Skin", 5.4))
					.flatMap(repository::save);

			pokemonFlux
					.thenMany(repository.findAll())
					.subscribe(System.out::println);
		};
	}

}
