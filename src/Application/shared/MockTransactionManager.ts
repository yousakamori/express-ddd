export class MockTransactionManager {
  async begin<T>(callback: () => Promise<T>): Promise<T> {
    return await callback();
  }
}
