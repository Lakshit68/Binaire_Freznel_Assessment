import { IModelRaw, IFilterCriteria, QueryTarget } from '../types';
export class ModelEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly family: string;
  public readonly pipelineTag: string;
  public readonly architectureTag: string;
  public readonly weightTag: string;
  public readonly safetensorCount: number;
  constructor(data: IModelRaw) {
    this.id = data.id;
    this.name = data.name;
    this.family = data.family;
    this.pipelineTag = data.pipeline_tag || '';
    this.architectureTag = data.architecture_tag || '';
    this.weightTag = data.weight_tag || '';
    this.safetensorCount = Number(data.safetensors_count) || 0;
  }
  public matchesSubstrings(query: string, target: QueryTarget): boolean {
    if (!query) return true;
    const q = query.toLowerCase();
    const nameMatch = this.name.toLowerCase().includes(q);
    const familyMatch = this.family.toLowerCase().includes(q);
    if (target === 'name') return nameMatch;
    if (target === 'family') return familyMatch;
    return nameMatch || familyMatch;
  }

  public matchesFilters(criteria: IFilterCriteria): boolean {
    if (criteria.pipeline && this.pipelineTag !== criteria.pipeline) return false;
    if (criteria.family && this.family !== criteria.family) return false;
    if (criteria.architecture && this.architectureTag !== criteria.architecture) return false;
    if (criteria.weight && this.weightTag !== criteria.weight) return false;
    if (this.safetensorCount < criteria.minSafetensors) return false;
    if (this.safetensorCount > criteria.maxSafetensors) return false;
    return true;
  }
}
