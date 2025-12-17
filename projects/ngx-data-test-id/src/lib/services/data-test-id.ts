import { Injectable } from '@angular/core';

export interface DataTestidMetaData {
  id: string;
  element: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class DataTestIdService {
  private readonly dataTestidRegistry = new Map<string, DataTestidMetaData>();
  private readonly duplicateDataTestids = new Set<string>();
  private readonly dataTestidElementRef = new Map<HTMLElement, string>();

  public registerDataTestId(dataTestidMetaData: DataTestidMetaData): void {
    const { id, element } = dataTestidMetaData;

    if (!dataTestidMetaData || typeof dataTestidMetaData !== 'object') {
      console.error('[DataTestIdService] Invalid dataTestidMetaData provided');
      return;
    }

    if (
      !dataTestidMetaData.id ||
      typeof dataTestidMetaData.id !== 'string' ||
      dataTestidMetaData.id.trim().length === 0
    ) {
      console.error('[DataTestIdService] Invalid id provided in dataTestidMetaData');
      return;
    }

    if (!element || !(element instanceof HTMLElement)) {
      console.error('[DataTestIdService] Invalid element provided in dataTestidMetaData');
      return;
    }

    const cleanId = id.trim();
    if (!this.dataTestidRegistry.has(cleanId)) {
      this.dataTestidRegistry.set(cleanId, {
        ...dataTestidMetaData,
        id: cleanId,
      });
    } else {
      this.duplicateDataTestids.add(cleanId);
      console.warn(`[DataTestIdService] Duplicate data-test-id detected: ${cleanId}`);
    }
  }

  public unregisterDataTestId(dataTestid: string, element: HTMLElement): void {
    if (!dataTestid || typeof dataTestid !== 'string' || dataTestid.trim().length === 0) {
      console.error('[DataTestIdService] Invalid dataTestid for unregistration provided');
      return;
    }

    if (!element || !(element instanceof HTMLElement)) {
      console.error('[DataTestIdService] Invalid element provided for unregistration');
      return;
    }

    const registeredDataTestid = this.dataTestidRegistry.get(dataTestid);

    if (registeredDataTestid && registeredDataTestid.element === element) {
      this.dataTestidRegistry.delete(dataTestid);
      this.duplicateDataTestids.delete(dataTestid);
    }

    this.dataTestidElementRef.delete(element);
  }

  public getAllDataTestids(): DataTestidMetaData[] {
    return Array.from(this.dataTestidRegistry.values()).sort((a, b) => a.id.localeCompare(b.id));
  }

  public searchByDataTestid(dataTestid: string): DataTestidMetaData[] {
    if (!dataTestid || typeof dataTestid !== 'string' || dataTestid.trim().length === 0) {
      return [];
    }

    const lowerCaseSearch = dataTestid.trim().toLowerCase();

    return this.getAllDataTestids().filter((metaData) =>
      metaData.id.toLowerCase().includes(lowerCaseSearch)
    );
  }

  public getDuplicateDataTestids(): string[] {
    return Array.from(this.duplicateDataTestids).sort();
  }

  public clearRegistry(): void {
    this.dataTestidRegistry.clear();
    this.duplicateDataTestids.clear();
    this.dataTestidElementRef.clear();
  }

  public getDataTestidRegistrySize(): number {
    return this.dataTestidRegistry.size;
  }

  public isDataTestidRegistered(dataTestid: string): boolean {
    if (!dataTestid || typeof dataTestid !== 'string' || dataTestid.trim().length === 0) {
      return false;
    }
    return this.dataTestidRegistry.has(dataTestid.trim());
  }
}
