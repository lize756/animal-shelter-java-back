package com.shelter.animalback.contract.api.animal;

import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.State;
import au.com.dius.pact.provider.junitsupport.loader.PactBroker;
import au.com.dius.pact.provider.junitsupport.loader.PactBrokerAuth;
import au.com.dius.pact.provider.spring.junit5.MockMvcTestTarget;

import com.shelter.animalback.controller.AnimalController;
import com.shelter.animalback.domain.Animal;
import com.shelter.animalback.service.interfaces.AnimalService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

@PactBroker(url = "${PACT_BROKER_BASE_URL}", authentication = @PactBrokerAuth(token = "PACT_BROKER_TOKEN"))
@Provider("AnimalShelterBack")
@ExtendWith(MockitoExtension.class)
public class AnimalTest {

    @Mock
    private AnimalService animalService;
    @InjectMocks
    private AnimalController animalController;

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    public void pactVerificationTestTemplate(PactVerificationContext context) {
    context.verifyInteraction();
}

@BeforeEach
public void changeContext(PactVerificationContext context) {
    System.setProperty("pact.verifier.publishResults", "true");
    MockMvcTestTarget testTarget = new MockMvcTestTarget();
    testTarget.setControllers(animalController);
    context.setTarget(testTarget);
}

@State("verified the list of animals")
public void listAnimals() {
    Animal animal = new Animal();

    animal.setName("Manchas");
    animal.setBreed("Bengali");
    animal.setGender("Female");
    animal.setVaccinated(true);

    List<Animal> animals = new ArrayList<Animal>();
    animals.add(animal);
    Mockito.when(animalService.getAll()).thenReturn(animals);
}

@State("obtain an animal by name")
public void getAnimal() {
    Animal animal = new Animal();

    animal.setName("Manchas");
    animal.setBreed("Bengali");
    animal.setGender("Female");
    animal.setVaccinated(true);
    animal.setVaccines(new String[] { "Leptospirosis", "Parvovirus" });

    Mockito.when(animalService.get("Manchas")).thenReturn(animal);
}

@State("allow verified if saved an animal")
public void saveAnimal() {
    Animal animal = new Animal();

    animal.setName("Manchas");
    animal.setBreed("Bengali");
    animal.setGender("Female");
    animal.setVaccinated(true);
    animal.setVaccines(new String[] { "Leptospirosis", "Parvovirus" });

    Mockito.when(animalService.save(animal)).thenReturn(animal);
}

@State("allow update an animal")
public void updateAnimal() {
    Animal animal = new Animal();

    animal.setName("Manchas");
    animal.setBreed("Bengali");
    animal.setGender("Female");
    animal.setVaccinated(true);
    animal.setVaccines(new String[] { "Leptospirosis", "Parvovirus" });

    Mockito.when(animalService.replace("Manchas", animal)).thenReturn(animal);
}

@State("alow delete an animal")
public void deleteAnimal() {
    Mockito.doNothing().when(animalService).delete("Manchas");// .thenReturn(animal);
}
}