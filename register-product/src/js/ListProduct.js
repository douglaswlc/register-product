import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, Popconfirm, Table } from "antd";
import React, { useState } from "react";

function ListProducts() {
  const [dataBooks, setDataBooks] = useState([
    {
      key: "1",
      title: "A coragem de ser imperfeito",
      price: 32,
      description:
        "É comum reprimirmos emoções como o medo, a mágoa ou a desilusão para nos defendermos a todo o custo de eventuais erros e fracassos. Essa atitude leva-nos muitas vezes a fechar as portas ao amor e aos outros.",
      imageUrl: "https://m.media-amazon.com/images/I/51U7zhht0wL.jpg",
    },
    {
      key: "2",
      title: "O Assassino do Rei – Robin Hobb",
      price: 20,
      description:
        "Fitz acabou de sobreviver à sua primeira missão, mas foi por pouco. Fraco e doente, ele está prestes a quebrar seus votos de fidelidade ao rei e fugir da vida que o aguarda na corte, mas tramas sombrias o atraem de volta à Torre do Cervo. O rei está doente e o príncipe-herdeiro precisa assumir a responsabilidade de proteger os Seis Ducados dos constantes ataques dos Salteadores dos Navios Vermelhos, um povo brutal que incendeia vilas e destrói a mente de qualquer aldeão capturado. Apenas Fitz está atento às perigosas armações políticas se espalhando na corte; por isso, o destino do reino pode estar em suas mãos. No entanto, salvá-lo requer o maior sacrifício de todos.",
      imageUrl:
        "https://leitorcompulsivo.com.br/wp-content/uploads/2023/01/assassino-do-rei.jpg",
    },
    {
      key: "3",
      title: "O Homem Inocente",
      price: 45,
      description:
        "Em 1971, aos 18 anos, Ron Williamson tinha uma carreira promissora como atleta. Acabara de assinar contrato com um grande time de beisebol e de se despedir de Ada, sua cidade natal, para ir em busca do sucesso. Seis anos depois, estava de volta, com os sonhos destruídos por um braço lesionado e o vício em bebidas e outras drogas. Foi morar com a mãe e passava vinte horas por dia dormindo no sofá. Em 1982, uma garçonete de 21 anos chamada Debra Sue Carter foi estuprada e assassinada brutalmente em Ada. Por cinco anos o crime ficou sem solução, até que uma frágil evidência apontou a investigação na direção de Ron. A partir daí o herói fracassado foi perseguido, acusado, julgado e condenado à morte. O processo, repleto de testemunhas mentirosas e provas corrompidas, não só acabou de arruinar a vida já despedaçada de um homem, como permitiu que o verdadeiro assassino ficasse impune.",
      imageUrl:
        "https://leitorcompulsivo.com.br/wp-content/uploads/2022/12/o-homem-inocente.jpg",
    },
    {
      key: "4",
      title: "A Vida Futura",
      price: 27,
      description:
        "Ao saber que seus livros seriam reescritos para alcançar mais leitores, os finados José de Alencar e Joaquim Maria Machado de Assis abandonam o Olimpo e desembarcam no Rio de Janeiro de 2020. Ali, Jota e Jota se envolvem com milicianos, conhecem uma jovem estudante tão enigmática quanto apaixonante e se veem às voltas com os debates identitários contemporâneos. Os renomados escritores atuam como uma dupla cômica de dar inveja a Stan Laurel e Oliver Hardy (O Gordo e o Magro, no Brasil) neste livro curto, poderoso e sarcástico.",
      imageUrl:
        "https://leitorcompulsivo.com.br/wp-content/uploads/2022/12/a-vida-futura.jpg",
    },
  ]);

  const [editingBook, setEditingBook] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [newBookData, setNewBookData] = useState();

  const columns = [
    {
      width: 200,
      title: "Título",
      dataIndex: "title",

      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Preço",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Descrição",
      width: 700,
      dataIndex: "description",
    },
    {
      title: "Imagem",
      dataIndex: "imageUrl",
      render: (imageUrl) => (
        <Image
          src={imageUrl}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (book) => (
        <span>
          <Popconfirm
            title="Tem certeza que deseja deletar este livro?"
            onConfirm={() => handleDelete(book.key)}
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            type="danger"
            icon={<EditOutlined />}
            onClick={() => handleEdit(book)}
          />
        </span>
      ),
    },
  ];

  const handleEdit = (book) => {
    setEditingBook(book);
    setVisible(true);
  };

  const handleSave = () => {
    if (modalType === "add") {
      const newBookKey = (dataBooks.length + 1).toString();
      const newBook = { ...newBookData, key: newBookKey };
      setDataBooks([...dataBooks, newBook]);
    } else {
      const updatedBooks = dataBooks.map((book) =>
        book.key === editingBook.key ? { ...book, ...editingBook } : book
      );
      setDataBooks(updatedBooks);
    }
    setVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBookData({ ...newBookData, [name]: value });
  };

  const handleDelete = (key) => {
    const newDataBooks = dataBooks.filter((book) => book.key !== key);
    setDataBooks(newDataBooks);
  };

  return (
    <div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          type="danger"
          icon={<PlusCircleFilled />}
          onClick={() => {
            setModalType("add");
            setVisible(true);
          }}
          style={{ fontSize: 20 }}
        >
          Adicionar Livro
        </Button>
      </div>
      <Table
        style={{
          margin: 40,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
        columns={columns}
        dataSource={dataBooks}
        pagination={false}
      />
      <Modal
        title={modalType === "add" ? "Adicionar Livro" : "Editar Livro"}
        visible={visible}
        onOk={handleSave}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item label="Título" name="title">
            <Input name="title" onChange={handleInputChange} placeholder="Harry Potter" />
          </Form.Item>
          <Form.Item label="Preço" name="price">
            <Input name="price" onChange={handleInputChange} placeholder="20" />
          </Form.Item>
          <Form.Item label="Descrição" name="description">
            <Input name="description" onChange={handleInputChange} placeholder="Resenha" />
          </Form.Item>
          <Form.Item label="Imagem" name="imageUrl">
            <Input name="imageUrl" onChange={handleInputChange} placeholder="Adicione a URL da imagem" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ListProducts;
