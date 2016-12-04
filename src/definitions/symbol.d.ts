interface Symbol {
	toString(): string;
	valueOf(): Object;
}

interface SymbolConstructor {
    prototype: Symbol;
	(description?: string|number): symbol;
	for(key: string): symbol;
	keyFor(sym: symbol): string;
}

declare var Symbol: SymbolConstructor;

interface SymbolConstructor {
	hasInstance: symbol;
	isConcatSpreadable: symbol;
	match: symbol;
	replace: symbol;
	search: symbol;
	species: symbol;
	split: symbol;
	toPrimitive: symbol;
	toStringTag: symbol;
	unscopables: symbol;
}

interface Symbol {
    [Symbol.toStringTag]: "Symbol";
}

interface SymbolConstructor {
	iterator: symbol;
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}
