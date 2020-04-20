import dynamic from 'next/dynamic';
import Head from 'next/head';
import * as React from 'react';
import Input from '../components/templates/Input';
import DrawGraph from '../src/DrawGraph';
import { LinkedList } from '../src/datastructures';

const GraphCanvas = dynamic(() => import('../components/GraphCanvas'), {
  ssr: false,
});

interface ArrayInputProps {
  array: string[];
  setArray(a: string[]): void;
}

function ArrayInput({ array, setArray }: ArrayInputProps) {
  const onChange = (str: string) => {
    setArray(str.split(/[\s]+/));
  };
  return (
    <Input placeholder="a list" value={array.join(' ')} onChange={onChange} />
  );
}

function InputCard({ setGraph }: { setGraph(g: DrawGraph): void }) {
  const [array, setArray] = React.useState(['1', 'a', '2']);

  React.useEffect(() => {
    setGraph(LinkedList.init(array).draw());
  }, [array]);

  return (
    <div className="invisible relative">
      <div className="w-64 absolute left-0 bg-white m-8 px-4 py-2 rounded-md shadow-lg font-mono">
        <h2 className="font-bold text-sm uppercase">Linked List</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <ArrayInput {...{ array, setArray }} />
          </div>
          <button className="col-span-2 rounded shadow font-bold px-2 py-1 bg-teal-500 transition-colors duration-500 hover:bg-teal-400 text-white">
            prepend
          </button>
          <Input placeholder="a list" value="x" onChange={() => {}} />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [graph, setGraph] = React.useState(DrawGraph.empty());

  return (
    <div>
      <Head>
        <title>Datastructures | Cronokirby</title>
        <meta
          name="description"
          content="Visualize how data structures work!"
        />
      </Head>
      <main>
        <InputCard setGraph={setGraph} />
        <GraphCanvas graph={graph} />
      </main>
    </div>
  );
}
