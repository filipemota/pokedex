package com.webflux.pokedex.model;

import java.util.Objects;

public class PokemonEvent {
    private Long eventoId;
    private String eventType;

    public PokemonEvent() {
        super();
    }
    public PokemonEvent(Long eventoId, String eventType) {
        this.eventoId = eventoId;
        this.eventType = eventType;
    }

    public Long getEventoId() {
        return eventoId;
    }

    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PokemonEvent that = (PokemonEvent) o;
        return Objects.equals(eventoId, that.eventoId) && Objects.equals(eventType, that.eventType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventoId, eventType);
    }

    @Override
    public String toString() {
        return "PokemonEvent{" +
                "eventoId=" + eventoId +
                ", eventType='" + eventType + '\'' +
                '}';
    }
}
