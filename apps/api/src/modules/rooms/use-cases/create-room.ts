export class CreateRoomUseCase {
  public execute() {
    console.log("Creating room");
    return {
      name: "Test room",
      descriptions: "This is a test room",
    };
  }
}