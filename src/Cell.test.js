import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import { act } from 'react-dom/test-utils';
import Cell from './Cell';

let container = null;

beforeEach(() => {
    container = document.createElement("tr");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("isLit class applied", () => {
    act(() => {
        render(<Cell isLit={true} />, container);
    });

    const cell = container.querySelector('td');
    expect(cell.className).toContain('Cell-lit');
});

it("isLit class not applied - parameter set", () => {
    act(() => {
        render(<Cell isLit={false} />, container);
    });

    const cell = container.querySelector('td');
    expect(cell.className).not.toContain('Cell-lit');
});

it("isLit class not applied - parameter not set", () => {
    act(() => {
        render(<Cell />, container);
    });

    const cell = container.querySelector('td');
    expect(cell.className).not.toContain('Cell-lit');
});

it("click binding set", () => {
    act(() => {
        render(<Cell flipCellsAroundMe={() => {console.log('clicked')}}/>, container);
    });

    const cell = container.querySelector('td');
    expect(cell.onclick).toBeDefined();
});

it("click binding not set", () => {
    act(() => {
        render(<Cell />, container);
    });

    const cell = container.querySelector('td');
    expect(cell.onclick).toBeNull();
});